import ChatsAside from 'components/ChatAside/ChatAside'
import ChatRoom from 'components/ChatRoom/ChatsRoom'
import BtnMain from 'components/ui/BtnMain/BtnMain'
import ModalForm from 'components/ui/ModalForm/ModalForm'
import Preloader from 'components/ui/Preloader/Preloader'
import UserCard from 'components/ui/UserCard/UserCard'
import { useAppSelector } from 'hooks/redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { useGetChatQuery, useJoinChatMutation, useLazyGetChatQuery } from 'services/chatService'
import '../ChatsPage/chats-page.css'

const ChatPage = () => {
  const [modal, showModal] = useState(false)
  const [url, setUrl] = useState('')
  const [getChat, { isLoading: getChatLoading }] = useLazyGetChatQuery()
  const [joinChat, { isLoading: joinChatLoading, error: joinChatError }] = useJoinChatMutation()
  const userState = useAppSelector(state => state.userReducer)
  const room = useParams<{ id: string }>().id

  const chatId = room ? room.substring(room.indexOf('_') + 1) : ''

  const { data: chat, isLoading } = useGetChatQuery(+chatId)

  const generateLink = () => {
    setUrl(`http://localhost:3000/chats/${room}`)
  }

  const copyTheLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText(url)
    showModal(false)
  }

  useEffect(() => {
    const isUserInChat = chat?.users.find(user => user.id === userState.id)
    if (!isUserInChat && chat?.id) {
      joinChat({
        userId: userState.id!,
        chatId: chat.id
      })
    }
  }, [chat, userState.id, joinChat])

  return (
    <main className='chats-page'>
      <section className='chats-page__global'>
        <div
          className={`chat-aside__modal-wrapper ${modal ? 'active' : ''}`}
          onClick={event => {
            if (event.target === event.currentTarget) {
              showModal(false)
            }
          }}
        >
          <ModalForm
            className='chat-page__modal'
            onSubmit={copyTheLink}
            onClose={() => showModal(false)}
            modalTitle='Link to copy'
            btnTitle='Copy the link'
            value={url}
            readOnly
          />
        </div>
        <ChatRoom />
      </section>
      <ChatsAside>
        {isLoading || getChatLoading ? (
          <Preloader />
        ) : (
          <ul className='chats-aside__chats-list'>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              {chat?.users.map(user => {
                return <UserCard key={user.id} img={user.avatar} userName={user.name} />
              })}
            </Scrollbar>
          </ul>
        )}
        <BtnMain
          onClick={() => {
            generateLink()
            showModal(true)
          }}
        >
          Invite
        </BtnMain>
      </ChatsAside>
    </main>
  )
}

export default ChatPage
