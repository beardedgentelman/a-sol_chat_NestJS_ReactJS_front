import BtnMain from 'components/ui/BtnMain/BtnMain'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useEffect, useRef } from 'react'
import { setMessage } from 'store/reducers/messagesSlice'
import { IMessageState } from 'types/types'
import './chat-room.css'

const ChatRoom = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.userReducer)

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageText = textareaRef.current?.value

    const message: IMessageState = {
      text: messageText,
      user: user,
      date: new Date().toISOString()
    }

    dispatch(setMessage(message))
  }

  return (
    <>
      <div className='chat-room__messages'></div>
      <form id='chat__form' className='chat-room__form' onSubmit={handleSubmit}>
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
