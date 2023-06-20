import emptyUserAvatar from 'assets/blankProfilePicture.webp'
import { useAppSelector } from 'hooks/redux'
import { FC } from 'react'
import { IMessage, IUser } from 'types/types'
import './message-card.css'

interface MessageCardProps extends IMessage {
  user: IUser
  key: number
}

const MessageCard: FC<MessageCardProps> = ({ user, text, date, userId }, key) => {
  const userState = useAppSelector(state => state.userReducer)

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

  return (
    <div key={key} className={`message-card ${userId === userState.id ? 'me' : 'interlocutor'}`}>
      <div className='message-card__img-wrapper'>
        <img src={!user?.avatar ? emptyUserAvatar : user.avatar} alt='User icon' />
      </div>
      <p className='message-card__text'>{text}</p>
      <p className='message-card__date'>{formattedTime}</p>
    </div>
  )
}

export default MessageCard
