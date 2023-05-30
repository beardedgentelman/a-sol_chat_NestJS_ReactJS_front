import { Navigate, Route, Routes } from 'react-router-dom'
import Registration from 'pages/Registration/Registration'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/registration' replace />} />
        <Route path='/registration' element={<Registration />}></Route>
      </Routes>
    </div>
  )
}

export default App
