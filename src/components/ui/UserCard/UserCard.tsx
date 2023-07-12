import blancUser from 'assets/blankProfilePicture.webp'
import { FC } from 'react'
import './user-card.css'

interface UserCardProps {
  className?: string
  userName?: string
  img?: string | null
}

const UserCard: FC<UserCardProps> = ({ className, img, userName }) => {
  return (
    <li className={`chats-aside__user-card ${className}`}>
      <div className='user-card__img-wrapper'>
        <img src={img! ? img : blancUser} alt='User avatar' />
      </div>
      <span className='user-card__text'>{userName}</span>
    </li>
  )
}

export default UserCard
