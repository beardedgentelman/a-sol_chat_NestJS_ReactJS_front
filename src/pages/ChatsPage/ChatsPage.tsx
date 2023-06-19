import ChatsAside from 'components/ChatAside/ChatAside'
import ChatRoom from 'components/ChatRoom/ChatRoom'
import './chats-page.css'

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
