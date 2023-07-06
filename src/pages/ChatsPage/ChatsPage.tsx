import ChatsAside from 'components/ChatAside/ChatAside'
import BtnMain from 'components/ui/BtnMain/BtnMain'
import ChatCard from 'components/ui/ChatCard/ChatCard'
import Preloader from 'components/ui/Preloader/Preloader'
import { WebsocketContext } from 'contexts/WebsocketContext'
import debounce from 'helpers/debounce'
import { useAppSelector } from 'hooks/redux'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { useCreateChatMutation, useJoinChatMutation } from 'services/chatService'
import { useGetMeMutation } from 'services/userService'
import { IChat } from 'types/types'
import './chats-page.css'

const ChatsPage = () => {
  const [modal, showModal] = useState(false)
  const [joinModal, showJoinModal] = useState(false)
  const [chatsSearchRes, setChatSearchRes] = useState<IChat[]>([])
  const socket = useContext(WebsocketContext)
  const [createChat, { isLoading: createChatLoading, error: createChatError }] = useCreateChatMutation()
  const [joinChat, { isLoading: joinChatLoading, error: joinChatError }] = useJoinChatMutation()
  const [getMe, { isLoading: getMeLoading, error: getMeError }] = useGetMeMutation()
  const userChats = useAppSelector(state => state.userReducer.chats)
  const userId = useAppSelector(state => state.userReducer.id)
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
    const chatName = formData.get('chats-list')?.toString()
    console.log(chatName)

    const chatId = chatLink ? chatLink.substring(chatLink.indexOf('_') + 1) : ''
    if (chatLink && chatLink !== '') {
      try {
        if (userId !== null) {
          await joinChat({
            userId: +userId,
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

  const handleSearchChange = debounce(value => {
    if (value !== '') {
      socket.emit('chatsSearch', value)
      socket.on('chatsSearchResult', result => {
        setChatSearchRes(result)
      })
    }
  }, 300)

  useEffect(() => {
    getMe()
  }, [])

  return (
    <main className='chats-page'>
      {joinChatLoading && !joinChatError ? (
        <Preloader />
      ) : (
        <>
          <section className='chats-page__global'></section>
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
                    }
                  }}
                >
                  {modal && (
                    <form className='chat-aside__modal-form' onSubmit={createChatHandle}>
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
                          required
                        />
                      </label>
                      <BtnMain type='submit'>Create</BtnMain>
                    </form>
                  )}
                  {joinModal && (
                    <form className='chat-aside__modal-form' onSubmit={joinChatHandle}>
                      <div className='chat-aside__modal-close' onClick={() => showJoinModal(false)}>
                        &#9587;
                      </div>
                      <label htmlFor='modal-form__link-input' className='modal-form__label'>
                        <span>Paste Chat Link</span>
                        <input
                          type='text'
                          id='modal-form__link-input'
                          name='chatLink'
                          className='modal-form__input'
                          required
                        />
                      </label>
                      <BtnMain type='submit'>Join Chat</BtnMain>
                    </form>
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

export default ChatsPage
