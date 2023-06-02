import { Navigate, Route, Routes } from 'react-router-dom'
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage'
import ChatsPage from 'pages/ChatsPage/ChatsPage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/chats' element={<ChatsPage />}></Route>
        {/* <Route path='/' element={<Navigate to='/registration' replace />} />
        <Route path='/registration' element={<RegistrationPage />}></Route> */}
      </Routes>
    </div>
  )
}

export default App
