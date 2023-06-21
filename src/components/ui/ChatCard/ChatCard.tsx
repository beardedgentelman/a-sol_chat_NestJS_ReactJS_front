import blankChatImg from 'assets/blank_chat_pict.png'
import { FC } from 'react'
import './chat-card.css'

interface ChatCardProps {
  id?: number | string
  onClick?: React.ReactEventHandler
  img?: string
  name: string
  className?: string
}

const ChatCard: FC<ChatCardProps> = ({ id, onClick, img, name, className }) => {
  return (
    <li className={`chat-card ${className}`} onClick={onClick}>
      <div className='chat-card__img-wrapper'>
        <img src={img ? img : blankChatImg} alt='chat avatar' />
      </div>
      <p className='chat-card__title'>{name}</p>
    </li>
  )
}

export default ChatCard
