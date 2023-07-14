import ChatsAside from 'components/ChatAside/ChatAside'
import Logout from 'components/Logout/Logout'
import UserCabinet from 'components/UserCabinet/UserCabinet'
import BtnMain from 'components/ui/BtnMain/BtnMain'
import ChatCard from 'components/ui/ChatCard/ChatCard'
import ModalForm from 'components/ui/ModalForm/ModalForm'
import Preloader from 'components/ui/Preloader/Preloader'
import { WebsocketContext } from 'contexts/WebsocketContext'
import { useAppSelector } from 'hooks/redux'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { useCreateChatMutation, useJoinChatMutation } from 'services/chatService'
import { useGetMeMutation } from 'services/userService'
import { IChat } from 'types/types'
import './personal-page.css'

const PersonalPage = () => {
  const [modal, showModal] = useState(false)
  const [joinModal, showJoinModal] = useState(false)
  const [chatsSearchRes, setChatSearchRes] = useState<IChat[]>([])
  const socket = useContext(WebsocketContext)
  const [createChat, { isLoading: createChatLoading, error: createChatError }] = useCreateChatMutation()
  const [joinChat, { isLoading: joinChatLoading, error: joinChatError }] = useJoinChatMutation()
  const [getMe, { isLoading: getMeLoading, error: getMeError }] = useGetMeMutation()
  const userChats = useAppSelector(state => state.userReducer.chats)
  const user = useAppSelector(state => state.userReducer)
  const navigate = useNavigate()

  const createChatHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const chatName = formData.get('chatName')?.toString()
    if (chatName && chatName !== '') {
      try {
        await createChat({
          name: chatName
        })
        await getMe()
      } catch (error: any) {
        console.error('Error creating chat:', error)
      }
    }
    showModal(false)
  }

  const joinChatHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const chatLink = formData.get('chatLink')?.toString()

    const chatId = chatLink ? chatLink.substring(chatLink.indexOf('_') + 1) : ''
    if (chatLink && chatLink !== '') {
      try {
        if (user.id !== null) {
          await joinChat({
            userId: +user.id,
            chatId: +chatId
          })
        }
        const chatURL = new URL(chatLink, window.location.href).pathname
        window.location.href = chatURL
      } catch (error: any) {
        console.error('Error to join chat. ', error)
      }
    }
    showJoinModal(false)
  }

  const showError = (error: any) => {
    if ('status' in error) {
      console.log('error with status', error)

      return error.message
    } else {
      console.log('error with message', error)

      return error.error.message
    }
  }

  const handleSearchChange = (value: string) => {
    if (value !== '') {
      socket.emit('chatsSearch', value)
      socket.on('chatsSearchResult', result => {
        setChatSearchRes(result)
      })
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  return (
    <main className='chats-page'>
      {joinChatLoading && !joinChatError ? (
        <Preloader />
      ) : (
        <>
          <section className='chats-page__global'>
            <Logout />
            <UserCabinet user={user} />
          </section>
          <ChatsAside>
            {createChatLoading || getMeLoading ? (
              createChatError || getMeError ? (
                <div>{(showError(createChatError) ?? showError(getMeError)) || 'Error occurred'}</div>
              ) : (
                <Preloader />
              )
            ) : (
              <>
                <div
                  className={`chat-aside__modal-wrapper ${modal || joinModal ? 'active' : ''}`}
                  onClick={event => {
                    if (event.target === event.currentTarget) {
                      showModal(false)
                      showJoinModal(false)
                    }
                  }}
                >
                  {modal && (
                    <ModalForm
                      onSubmit={createChatHandle}
                      onClose={() => showModal(false)}
                      modalTitle='Enter chat name'
                      btnTitle='Create'
                    />
                  )}
                  {joinModal && (
                    <ModalForm
                      onSubmit={joinChatHandle}
                      onClose={() => showJoinModal(false)}
                      modalTitle='Paste Chat Link'
                      btnTitle='Join Chat'
                    />
                  )}
                </div>
                <input
                  className='chat-aside__search'
                  id='chats-list__input'
                  list='chats-list'
                  name='chats-list'
                  onChange={e => handleSearchChange(e.target.value)}
                  placeholder='Chat search'
                />
                {Array.isArray(chatsSearchRes) ? (
                  <datalist id='chats-list'>
                    {chatsSearchRes.map(chat => (
                      <option
                        className='chats-list__option'
                        value={chat.name}
                        key={chat.id}
                        onClick={() => console.log(chat)}
                      />
                    ))}
                  </datalist>
                ) : null}
                <ul className='chats-aside__chats-list'>
                  <Scrollbar style={{ width: '100%', height: '100%' }}>
                    {userChats?.map(chat => (
                      <ChatCard
                        onClick={() => navigate(`${chat.name}_${chat.id}`)}
                        key={chat.id}
                        name={chat.name}
                        id={chat.id}
                      />
                    ))}
                  </Scrollbar>
                </ul>
                <div className='chats-aside__btns'>
                  <BtnMain onClick={() => showModal(true)}>Create Chat</BtnMain>
                  <BtnMain onClick={() => showJoinModal(true)}>Join chat</BtnMain>
                </div>
              </>
            )}
          </ChatsAside>
        </>
      )}
    </main>
  )
}

export default PersonalPage
