import Preloader from 'components/ui/Preloader/Preloader'
import { useAppSelector } from 'hooks/redux'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetMeMutation } from 'services/userService'

const PublicRoute = () => {
  const token = localStorage.getItem('token')
  const [getMe, { isLoading }] = useGetMeMutation()
  const user = useAppSelector(state => state.userReducer)

  useEffect(() => {
    if (token) {
      getMe()
    }
  }, [token, getMe])

  if (isLoading) {
    return <Preloader />
  }

  return token && user ? <Navigate to={`${user.name}`} /> : <Outlet />
}

export default PublicRoute
