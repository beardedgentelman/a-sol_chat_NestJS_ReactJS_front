import BtnMain from 'components/ui/BtnMain/BtnMain'
import MessageCard from 'components/ui/MessageCard/MessageCard'
import { useLiveQuery } from 'dexie-react-hooks'
import { addMessageToIndexDb, messagesTableIndexedDb } from 'helpers/toIndexDB'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { FC, useEffect, useRef, useState } from 'react'
import { setMessage } from 'store/reducers/messagesSlice'
import { IMessageState } from 'types/types'
import './chat-room.css'

import io, { Socket } from 'socket.io-client'

const ChatRoom: FC = () => {
  const [socket, setSocket] = useState<Socket>()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userReducer)

  const allMessages = useLiveQuery(() => messagesTableIndexedDb.toArray(), [])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener('input', autoResizeTextarea)
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener('input', autoResizeTextarea)
      }
    }
  }, [])

  function autoResizeTextarea() {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const send = (value: IMessageState) => {
    socket?.emit('message', value)
  }

  useEffect(() => {
    const newSocket = io('http://localhost:8081')
    setSocket(newSocket)
  }, [setSocket])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageText: string | null = textareaRef.current?.value ?? null

    const message: IMessageState = {
      text: messageText,
      user: user,
      date: new Date().toUTCString()
    }

    addMessageToIndexDb(message)
    dispatch(setMessage(message))
    e.currentTarget.reset()
  }

  return (
    <>
      <div className='chat-room__messages'>
        {allMessages?.map(({ text, user, date }, id) => (
          <MessageCard text={text} user={user} date={date} key={id} />
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
