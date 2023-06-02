import ChatsPage from 'pages/ChatsPage/ChatsPage'
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Routes>
        {/* TODO: Make private routes */}

        {/* <Route element={<AuthRoute />}> */}
        <Route path='/chats' element={<ChatsPage />} />
        {/* </Route> */}
        <Route path='/' element={<Navigate to='/registration' replace />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </div>
  )
}

export default App
