import blancAvatar from 'assets/blankProfilePicture.webp'

import BackgroundBox from 'components/ui/BackgroundBox/BackgroundBox'
import BtnMain from 'components/ui/BtnMain/BtnMain'
import 'pages/PersonalPage/personal-page.css'
import { FC, useRef, useState } from 'react'
import { IUpdate, IUpdateError, IUser } from 'types/types'

import { updateUserValidation } from './validation'

interface UserCabinetProps {
  user: IUser
}

const UserCabinet: FC<UserCabinetProps> = ({ user }) => {
  const [editMode, setEditMode] = useState(false)
  const [fileName, setFileName] = useState('Choose picture +')
  const [miniature, setMiniature] = useState('')
  const [formErrorsValidation, setFormErrorsValidation] = useState<IUpdateError>({})

  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
      setFileName(fileRef.current?.files[0].name)
      setMiniature(URL.createObjectURL(fileRef.current.files[0]))
    }
  }

  const handleFileClick = (e: React.MouseEvent) => {
    fileRef.current?.click()
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    const formElement = e.currentTarget.closest('form')
    if (formElement) {
      formElement.reset()
      if (fileRef.current) {
        fileRef.current.value = ''
        setFileName('Choose picture +')
        setMiniature('')
      }
    }
    setEditMode(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues: IUpdate = {
      name: '',
      email: '',
      avatar: null
    }
    for (const [key, value] of formData.entries()) {
      if (key === 'avatar') {
        formValues.avatar = value as File
      } else {
        const formValue = value as string
        // eslint-disable-next-line prettier/prettier
        (formValues as any)[key] = formValue
      }
    }

    try {
      await updateUserValidation.validate(formValues, { abortEarly: false }).then(() => setFormErrorsValidation({}))
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const validationErrors = error.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = curr.message
          return acc
        }, {})
        setFormErrorsValidation(validationErrors)
        console.log(formErrorsValidation)
      }
    }
  }

  return (
    <BackgroundBox className='user-cabinet__bg-box'>
      <form className='user-cabinet' onSubmit={handleSubmit}>
        <div className='user-cabinet__img-wrapper'>
          <div className='user-cabinet__img'>
            <img src={(miniature !== '' ? miniature : user.avatar) || blancAvatar} alt='User avatar' />
          </div>
          {editMode && (
            <>
              <BtnMain className='user-cabinet__file-btn' onClick={handleFileClick}>
                {fileName}
                <input
                  ref={fileRef}
                  onChange={handleFileChange}
                  type='file'
                  name='avatar'
                  className='user-cabinet__file'
                  id='avatar'
                  placeholder='Avatar'
                />
              </BtnMain>
            </>
          )}
        </div>
        <div className='user-cabinet__information'>
          <div className='information__box'>
            <p className='information__label'>Name:</p>
            {editMode ? (
              <input
                className='information__input'
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                defaultValue={user.name}
              />
            ) : (
              <p className='information__username'>{user.name}</p>
            )}
          </div>
          <div className='information__box'>
            <p className='information__label'>Email:</p>
            {editMode ? (
              <input
                className='information__input'
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                defaultValue={user.email}
              />
            ) : (
              <p className='information__username'>{user.email}</p>
            )}
          </div>

          <div className='information__btn-wrapper'>
            {editMode ? (
              <>
                <BtnMain className='information__btn' type='submit'>
                  Save
                </BtnMain>
                <BtnMain className='information__btn' onClick={handleReset}>
                  Cancel
                </BtnMain>
              </>
            ) : (
              <BtnMain
                className='information__btn'
                onClick={() => {
                  setEditMode(true)
                }}
              >
                Edit
              </BtnMain>
            )}
          </div>
        </div>
      </form>
    </BackgroundBox>
  )
}

export default UserCabinet
