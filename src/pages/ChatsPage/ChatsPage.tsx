import ChatsAside from 'components/ChatAside/ChatAside'
import BtnMain from 'components/ui/BtnMain/BtnMain'
import ChatCard from 'components/ui/ChatCard/ChatCard'
import Preloader from 'components/ui/Preloader/Preloader'
import { useAppSelector } from 'hooks/redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { useCreateChatMutation } from 'services/chatService'
import { useGetMeMutation } from 'services/userService'
import './chats-page.css'

const ChatsPage = () => {
  const [modal, showModal] = useState(false)
  const [createChat, { isLoading: createChatLoading, error: createChatError }] = useCreateChatMutation()
  const [getMe, { isLoading: getMeLoading, error: getMeError }] = useGetMeMutation()
  const userChats = useAppSelector(state => state.userReducer.chats)

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

  const showError = (error: any) => {
    if ('status' in error) {
      console.log('error with status', error)

      return error.message
    } else {
      console.log('error with message', error)

      return error.error.message
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    getMe()
  }, [])

  return (
    <main className='chats-page'>
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
              className={`chat-aside__modal-wrapper ${modal ? 'active' : ''}`}
              onClick={event => {
                if (event.target === event.currentTarget) {
                  showModal(false)
                }
              }}
            >
              <form className='chat-aside__modal-form' onSubmit={createChatHandle}>
                <div className='chat-aside__modal-close' onClick={() => showModal(false)}>
                  &#9587;
                </div>
                <label htmlFor='modal-form__input' className='modal-form__label'>
                  <span>Enter chat name</span>
                  <input type='text' id='modal-form__input' name='chatName' className='modal-form__input' required />
                </label>
                <BtnMain type='submit'>Create</BtnMain>
              </form>
            </div>
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
            <BtnMain onClick={() => showModal(true)}>Create Chat</BtnMain>
          </>
        )}
      </ChatsAside>
    </main>
  )
}

export default ChatsPage
