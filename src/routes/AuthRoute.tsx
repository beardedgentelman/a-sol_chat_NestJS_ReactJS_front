import { useAppSelector } from 'hooks/redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const user = useAppSelector(state => state.authReducer.authState.user)
  return user !== null ? <Outlet /> : <Navigate to='/registration' />
}

export default AuthRoute
