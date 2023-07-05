import blancUser from 'assets/blankProfilePicture.webp'
import { FC } from 'react'
import './user-card.css'

interface UserCardProps {
  className?: string
  cardKey?: string | number | null
  userName?: string
  img?: string | null
}

const UserCard: FC<UserCardProps> = ({ className, cardKey, img, userName }) => {
  return (
    <li className={`chats-aside__user-card ${className}`} key={cardKey}>
      <div className='user-card__img-wrapper'>
        <img src={img! ? img : blancUser} alt='User avatar' />
      </div>
      <span className='user-card__text'>{userName}</span>
    </li>
  )
}

export default UserCard
