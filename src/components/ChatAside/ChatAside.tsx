import BtnMain from 'components/ui/BtnMain/BtnMain'
import Preloader from 'components/ui/Preloader/Preloader'
import { useAppSelector } from 'hooks/redux'
import { useCreateChatMutation } from 'services/chatService'
import './chat-aside.css'

const ChatsAside = () => {
  const [createChat, { isLoading, error }] = useCreateChatMutation()
  const user = useAppSelector(state => state.userReducer)

  const createChatHandle = () => {
    if (user.id) {
      createChat(user.id)
    }
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <aside className='chats-aside'>
      <section className='chats-aside__chats'>
        <ul className='chats-aside__chats-list'>
          <li>some</li>
        </ul>
        <BtnMain onClick={createChatHandle}>Create Chat</BtnMain>
      </section>
    </aside>
  )
}

export default ChatsAside
