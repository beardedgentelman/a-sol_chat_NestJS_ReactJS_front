import BtnMain from 'components/ui/BtnMain/BtnMain'
import ChatCard from 'components/ui/ChatCard/ChatCard'
import Preloader from 'components/ui/Preloader/Preloader'
import { useAppSelector } from 'hooks/redux'
import { FC, useState } from 'react'
import { useCreateChatMutation } from 'services/chatService'
import { useGetMeMutation } from 'services/userService'
import './chat-aside.css'

const ChatsAside: FC = () => {
  const [modal, showModal] = useState(false)
  const [createChat, { isLoading: createChatLoading, error: createChatError }] = useCreateChatMutation()
  const userChats = useAppSelector(state => state.userReducer.chats)
  const [getMe, { isLoading: getMeLoading, error: getMeError }] = useGetMeMutation()

  const createChatHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const chatName = formData.get('chatName')?.toString()
    if (chatName && chatName !== '') {
      createChat({
        name: chatName
      })
    }
    getMe()
    showModal(false)
  }

  return (
    <aside className='chats-aside'>
      <section className='chats-aside__chats'>
        {createChatLoading || getMeLoading ? (
          createChatError || getMeError ? (
            <div>{(createChatError?.message ?? getMeError?.message) || 'Error occurred'}</div>
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
              {userChats?.map(chat => (
                <ChatCard key={chat.id} name={chat.name} id={chat.id} />
              ))}
            </ul>
            <BtnMain onClick={() => showModal(true)}>Create Chat</BtnMain>
          </>
        )}
      </section>
    </aside>
  )
}

export default ChatsAside
