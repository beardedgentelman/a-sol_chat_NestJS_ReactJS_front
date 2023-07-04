import ChatsAside from 'components/ChatAside/ChatAside'
import ChatRoom from 'components/ChatRoom/ChatsRoom'
import { useParams } from 'react-router-dom'
import { useGetChatQuery } from 'services/chatService'
import '../ChatsPage/chats-page.css'

const ChatPage = () => {
  const room = useParams<{ id: string }>().id

  const chatId = room ? room.substring(room.indexOf('_') + 1) : ''

  const { data: chat, isLoading, isError } = useGetChatQuery(+chatId)

  return (
    <main className='chats-page'>
      <section className='chats-page__global'>
        <ChatRoom />
      </section>
      <ChatsAside>
        {chat?.users.map(user => {
          return <div key={user.id}>{user.name}</div>
        })}
      </ChatsAside>
    </main>
  )
}

export default ChatPage
