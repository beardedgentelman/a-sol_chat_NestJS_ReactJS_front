import BtnMain from 'components/ui/BtnMain/BtnMain'
import MessageCard from 'components/ui/MessageCard/MessageCard'
import Preloader from 'components/ui/Preloader/Preloader'
import { WebsocketContext } from 'contexts/WebsocketContext'
import { useLiveQuery } from 'dexie-react-hooks'
import { addMessageToIndexDb, messagesTableIndexedDb } from 'helpers/toIndexDB'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useGetMeMutation } from 'services/userService'
import { setMessage } from 'store/reducers/messagesSlice'
import { IMessage } from 'types/types'
import './chat-room.css'

const ChatRoom: FC = () => {
  const [val, setVal] = useState<string>('')
  const socket = useContext(WebsocketContext)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [getMe, { isLoading }] = useGetMeMutation()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userReducer)

  const allMessages = useLiveQuery(() => messagesTableIndexedDb.toArray(), [])

  const resizeTextArea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    socket.on('onMessage', newMessage => {
      addMessageToIndexDb(newMessage)
      dispatch(setMessage(newMessage))
    })

    return () => {
      socket.off('connect')
      socket.off('onMessage')
    }
  }, [])

  useEffect(resizeTextArea, [val])

  useEffect(() => {
    getMe()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageText: string | null = textareaRef.current?.value ?? null

    const message: IMessage = {
      userId: user.id,
      text: messageText,
      date: new Date().toUTCString()
    }

    socket.emit('newMessage', message)

    e.currentTarget.reset()
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <div className='chat-room__messages'>
        {allMessages?.map(({ text, date, userId }, id) => (
          <MessageCard text={text} user={user} date={date} userId={userId} key={id} />
        ))}
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
          <textarea
            ref={textareaRef}
            id='message__textarea'
            className='form__textarea'
            placeholder='Message...'
            onChange={() => setVal(textareaRef.current?.value || '')}
          ></textarea>
        </div>
        <BtnMain id='send__btn' type='submit' className='form__btn'>
          Send
        </BtnMain>
      </form>
    </>
  )
}

export default ChatRoom
