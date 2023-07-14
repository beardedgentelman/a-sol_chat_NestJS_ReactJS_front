import BtnMain from 'components/ui/BtnMain/BtnMain'
import MessageCard from 'components/ui/MessageCard/MessageCard'
import Preloader from 'components/ui/Preloader/Preloader'
import Textarea from 'components/ui/Textarea/Textarea'
import { WebsocketContext } from 'contexts/WebsocketContext'
import { useLiveQuery } from 'dexie-react-hooks'
import { addMessageToIndexDb, messagesTableIndexedDb } from 'helpers/toIndexDB'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { useLazyGetChatQuery } from 'services/chatService'
import { useGetMeMutation } from 'services/userService'
import { setMessage } from 'store/reducers/messagesSlice'
import { IMessage } from 'types/types'
import { v4 as uuidv4 } from 'uuid'
import './chat-room.css'

const ChatRoom: FC = () => {
  const [val, setVal] = useState<string>('')
  const socket = useContext(WebsocketContext)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [getMe, { isLoading }] = useGetMeMutation()
  const [getChat] = useLazyGetChatQuery()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userReducer)
  const room = useParams<{ id: string }>().id
  const chatId = room ? room.substring(room.indexOf('_') + 1) : ''

  const allMessages = useLiveQuery(() => messagesTableIndexedDb.toArray(), [])
  const filteredMessages = allMessages ? allMessages.filter(message => message.chatId === +chatId) : []

  const resizeTextArea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    socket.emit('joinRoom', room)
    if (filteredMessages.length > 0) {
      const messComparison = {
        chatId,
        filteredMessages
      }
      socket.emit('getMessages', messComparison)
    }

    socket.on('getMessagesResult', result => {
      if (result) {
        return
      } else {
        result.map((mess: IMessage) => addMessageToIndexDb(mess))
      }
    })

    socket.on('reloadPage', () => {
      getChat(+chatId)
    })

    socket.on('onMessage', newMessage => {
      addMessageToIndexDb(newMessage)
      dispatch(setMessage(newMessage))
    })

    return () => {
      socket.off('connect')
      socket.off('onMessage')
    }
  }, [room, filteredMessages])

  useEffect(resizeTextArea, [val])

  useEffect(() => {
    if (user.id === null) {
      getMe()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageText: string | null = textareaRef.current?.value ?? null

    const message: IMessage = {
      id: uuidv4(),
      userId: user.id,
      chatId: +chatId,
      text: messageText,
      date: new Date().toString()
    }

    socket.emit('newMessage', { room, message })

    e.currentTarget.reset()
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <div className='chat-room__messages'>
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {filteredMessages?.map(({ text, date, userId, id }) => (
            <MessageCard text={text} user={user} date={date} chatId={+chatId} userId={userId} id={id} key={id} />
          ))}
        </Scrollbar>
      </div>
      <form
        id='chat__form'
        className='chat-room__form'
        onSubmit={handleSubmit}
        onKeyDown={ev => {
          if (ev.key === 'Enter') {
            handleSubmit(ev)
          }
        }}
      >
        <div className='form__textarea-container'>
          <Textarea
            forwardedRef={textareaRef}
            id='message__textarea'
            className='form__textarea'
            placeholder='Message...'
            onChange={() => setVal(textareaRef.current?.value || '')}
          ></Textarea>
        </div>
        <BtnMain id='send__btn' type='submit' className='form__btn'>
          Send
        </BtnMain>
      </form>
    </>
  )
}

export default ChatRoom
