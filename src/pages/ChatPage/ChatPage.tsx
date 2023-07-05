import ChatsAside from 'components/ChatAside/ChatAside'
import ChatRoom from 'components/ChatRoom/ChatsRoom'
import BtnMain from 'components/ui/BtnMain/BtnMain'
import Preloader from 'components/ui/Preloader/Preloader'
import UserCard from 'components/ui/UserCard/UserCard'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { useGetChatQuery, useLazyGetChatQuery } from 'services/chatService'
import '../ChatsPage/chats-page.css'

const ChatPage = () => {
  const [modal, showModal] = useState(false)
  const [url, setUrl] = useState('')
  const [getChat, { isLoading: getChatLoading }] = useLazyGetChatQuery()
  const room = useParams<{ id: string }>().id

  const chatId = room ? room.substring(room.indexOf('_') + 1) : ''

  const { data: chat, isLoading, isError } = useGetChatQuery(+chatId)

  console.log(chat)

  const generateLink = () => {
    setUrl(`http://localhost:3000/chats/${room}`)
  }

  const copyTheLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText(url)
    showModal(false)
  }

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
          <form className='chat-aside__modal-form chat-page__modal' onSubmit={copyTheLink}>
            <div className='chat-aside__modal-close' onClick={() => showModal(false)}>
              &#9587;
            </div>
            <label htmlFor='modal-form__input' className='modal-form__label'>
              <span>Enter chat name</span>
              <input
                type='text'
                id='modal-form__input'
                name='chatName'
                className='modal-form__input'
                value={url}
                readOnly
              />
            </label>
            <BtnMain type='submit'>Copy the link</BtnMain>
          </form>
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
                return <UserCard cardKey={user.id} img={user.avatar} userName={user.name} />
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
