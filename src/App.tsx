import { WebsocketProvider, socket } from 'contexts/WebsocketContext'
import ChatsPage from 'pages/ChatsPage/ChatsPage'
import LoginPage from 'pages/RegistrationLoginPage/LoginPage'
import RegistrationPage from 'pages/RegistrationLoginPage/RegistrationPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthRoute from 'routes/AuthRoute'

function App() {
  return (
    <div className='App'>
      <WebsocketProvider value={socket}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path='/chats' element={<ChatsPage />} />
          </Route>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </WebsocketProvider>
    </div>
  )
}

export default App
