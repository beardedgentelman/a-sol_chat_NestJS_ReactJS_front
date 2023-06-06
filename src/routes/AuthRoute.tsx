import { useAppSelector } from 'hooks/redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const user = useAppSelector(state => state.userReducer.user)
  const token = localStorage.getItem('token')
  return user !== null && token ? <Outlet /> : <Navigate to='/registration' />
}

export default AuthRoute
