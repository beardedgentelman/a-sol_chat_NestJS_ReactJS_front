import ChatsAside from 'components/ChatAside/ChatAside'
import './chats-page.css'
import ChatRoom from 'components/ChatRoom/ChatRoom'

const ChatsPage = () => {
  return (
    <main className='chats-page'>
      <section className='chats-page__global'>
        <ChatRoom />
      </section>
      <ChatsAside />
    </main>
  )
}

export default ChatsPage
