import { WebsocketProvider, socket } from 'contexts/WebsocketContext'
import { useAppSelector } from 'hooks/redux'
import ChatPage from 'pages/ChatPage/ChatPage'
import ChatsPage from 'pages/ChatsPage/ChatsPage'
import MainPage from 'pages/MainPage/MainPage'
import LoginPage from 'pages/RegistrationLoginPage/LoginPage'
import RegistrationPage from 'pages/RegistrationLoginPage/RegistrationPage'
import { Route, Routes } from 'react-router-dom'
import AuthRoute from 'routes/AuthRoute'

function App() {
  return (
    <div className='App'>
      <WebsocketProvider value={socket}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path='/chats' element={<ChatsPage />} />
            <Route path='/chats/:id' element={<ChatPage />} />
          </Route>
          <Route path='/' element={<MainPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </WebsocketProvider>
    </div>
  )
}

export default App
