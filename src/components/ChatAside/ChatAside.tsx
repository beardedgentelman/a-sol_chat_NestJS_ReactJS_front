import BtnMain from 'components/ui/BtnMain/BtnMain'
import './chat-aside.css'

const ChatsAside = () => {
  return (
    <aside className='chats-aside'>
      <section className='chats-aside__chats'>
        <ul className='chats-aside__chats-list'>
          <li>some</li>
        </ul>
        <BtnMain>Create Chat</BtnMain>
      </section>
    </aside>
  )
}

export default ChatsAside
