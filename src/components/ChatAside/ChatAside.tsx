import { FC, ReactNode } from 'react'
import './chat-aside.css'

interface ChatsAsideProps {
  children?: ReactNode
}

const ChatsAside: FC<ChatsAsideProps> = ({ children }) => {
  return (
    <aside className='chats-aside'>
      <section className='chats-aside__chats'>{children}</section>
    </aside>
  )
}

export default ChatsAside
