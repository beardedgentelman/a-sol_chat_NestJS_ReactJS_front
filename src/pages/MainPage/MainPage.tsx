import BackgroundBox from 'components/ui/BackgroundBox/BackgroundBox'
import BtnMain from 'components/ui/BtnMain/BtnMain'
import { Link } from 'react-router-dom'
import './main-page.css'

const MainPage = () => {
  return (
    <BackgroundBox>
      <div className='main-page'>
        <h1 className='main-page__title'>Welcome to A-Sol Chats</h1>
        <div className='main-page__links'>
          <Link to='/login'>
            <BtnMain className='main-page__link'>Sign In</BtnMain>
          </Link>
          <Link to='/registration'>
            <BtnMain className='main-page__link'>Sign Up</BtnMain>
          </Link>
        </div>
      </div>
    </BackgroundBox>
  )
}

export default MainPage
