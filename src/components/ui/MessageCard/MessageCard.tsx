import emptyUserAvatar from 'assets/blankProfilePicture.webp'
import { socket } from 'contexts/WebsocketContext'
import { FC } from 'react'
import { IMessageState, IUser } from 'types/types'
import './message-card.css'

interface MessageCardProps extends IMessageState {
  user: IUser
  key: number
}

const MessageCard: FC<MessageCardProps> = ({ user, text, date, messSocket }, key) => {
  const extractTime = (dateString: string | null): string => {
    if (dateString) {
      const regex = /(\d{2}):(\d{2})/
      const match = regex.exec(dateString)
      if (match) {
        const hours = match[1]
        const minutes = match[2]
        return `${hours}:${minutes}`
      }
    }
    return ''
  }

  const formattedTime = extractTime(date || '')

  const mySocket = socket.id

  return (
    <div key={key} className={`message-card ${messSocket === mySocket ? 'me' : 'interlocutor'}`}>
      <div className='message-card__img-wrapper'>
        <img src={!user?.avatar ? emptyUserAvatar : user.avatar} alt='User icon' />
      </div>
      <p className='message-card__text'>{text}</p>
      <p className='message-card__date'>{formattedTime}</p>
    </div>
  )
}

export default MessageCard
