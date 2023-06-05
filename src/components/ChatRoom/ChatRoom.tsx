import BtnMain from 'components/ui/BtnMain/BtnMain'
import { useEffect, useRef } from 'react'
import './chat-room.css'

const ChatRoom = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  return (
    <>
      <div className='chat-room__messages'></div>
      <form id='chat__form' className='chat-room__form'>
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
