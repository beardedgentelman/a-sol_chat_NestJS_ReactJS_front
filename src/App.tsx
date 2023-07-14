import { WebsocketProvider, socket } from 'contexts/WebsocketContext'
import ChatPage from 'pages/ChatPage/ChatPage'
import MainPage from 'pages/MainPage/MainPage'
import PersonalPage from 'pages/PersonalPage/PersonalPage'
import LoginPage from 'pages/RegistrationLoginPage/LoginPage'
import RegistrationPage from 'pages/RegistrationLoginPage/RegistrationPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthRoute from 'routes/AuthRoute'
import PublicRoute from 'routes/PublicRoute'

function App() {
  return (
    <div className='App'>
      <WebsocketProvider value={socket}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/' element={<MainPage />} />

            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path='/:name' element={<PersonalPage />} />
            <Route path='/:name/:id' element={<ChatPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </WebsocketProvider>
    </div>
  )
}

export default App
