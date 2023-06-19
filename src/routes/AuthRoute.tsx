import { useAppSelector } from 'hooks/redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const user = useAppSelector(state => state.userReducer)
  const token = localStorage.getItem('token')
  return user !== null && token ? <Outlet /> : <Navigate to='/login' />
}

export default AuthRoute
