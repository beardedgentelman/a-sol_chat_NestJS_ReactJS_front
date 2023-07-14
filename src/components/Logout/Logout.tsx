import BtnMain from 'components/ui/BtnMain/BtnMain'
import { FC } from 'react'

import logOut from 'assets/logout-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom'
import '../../pages/PersonalPage/personal-page.css'

const Logout: FC = () => {
  const navigate = useNavigate()
  const logOutHandler = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <BtnMain className='logout__btn' onClick={logOutHandler}>
      <img src={logOut} alt='Log Out' />
    </BtnMain>
  )
}

export default Logout
