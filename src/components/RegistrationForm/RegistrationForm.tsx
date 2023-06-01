import { useAppDispatch } from 'hooks/redux'
import { useRef, useState } from 'react'

import { RegistrationSlice } from 'store/reducers/RegistrationSlice'
import { IRegistration, IRegistrationError } from 'types/types'

import { formValidation } from './validation'

import './registration-form.css'

const RegistrationForm = () => {
  // TODO: replace to update user form
  // const [fileName, setFileName] = useState('Add avatar +')
  // const [miniature, setMiniature] = useState('')
  const [formErrors, setFormErrors] = useState<IRegistrationError>({})

  const passwordRef = useRef<HTMLInputElement>(null)
  // TODO: replace to update user form
  // const fileRef = useRef<HTMLInputElement>(null)

  const { postRegistration } = RegistrationSlice.actions
  const dispatch = useAppDispatch()

  // TODO: replace to update user form
  // const handleFileChange = () => {
  //   if (fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
  //     setFileName(fileRef.current?.files[0].name)
  //     setMiniature(URL.createObjectURL(fileRef.current.files[0]))
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues: IRegistration = {
      username: '',
      email: '',
      password: ''
    }

    formData.forEach((value, key) => {
      // TODO: replace to update user form
      // if (key === 'file' && value instanceof File && value.size === 0) {
      //   return
      // }
      formValues[key as keyof IRegistration] = value as string
    })

    try {
      await formValidation.validate(formValues, { abortEarly: false })
      setFormErrors({})

      dispatch(postRegistration(formValues))
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const errors = err.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = curr.message
          return acc
        }, {})
        setFormErrors(errors)
      }
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form__field'>
        <input type='text' name='username' id='username' placeholder='Name' />
      </div>
      {formErrors.username && <span className='form__error'>{formErrors.username}</span>}

      <div className='form__field'>
        <input type='email' name='email' id='email' placeholder='Email' />
      </div>
      {formErrors.email && <span className='form__error'>{formErrors.email}</span>}

      <div className='form__field'>
        <input ref={passwordRef} type='password' name='password' id='password' placeholder='Password' />
        <p
          className='form__field-eye'
          onMouseEnter={() => passwordRef.current?.setAttribute('type', 'text')}
          onMouseLeave={() => passwordRef.current?.setAttribute('type', 'password')}
        >
          &#128065;
        </p>
      </div>
      {formErrors.password && <span className='form__error'>{formErrors.password}</span>}

      <div className='form__field'>
        <input type='password' name='confirmPassword' id='confirmPassword' placeholder='Confirm password' />
      </div>
      {formErrors.confirmPassword && <span className='form__error'>{formErrors.confirmPassword}</span>}

      {/* TODO:Replace to user update form */}
      {/* <div className='form__avatar-field'>
        <button
          className='form__avatar-btn'
          type='button'
          onClick={() => {
            fileRef.current?.click()
          }}
        >
          {fileName}
          <input ref={fileRef} onChange={handleFileChange} type='file' name='file' id='file' placeholder='Avatar' />
        </button>
        {miniature !== '' && (
          <div className='form__avatar-field_wrapper'>
            <img src={miniature} alt='Previous miniature' />
          </div>
        )}
      </div>
      {formErrors.file && <span className='form__error'>{formErrors.file}</span>} */}

      <input type='submit' className='form__submit' placeholder='Submit' />
    </form>
  )
}

export default RegistrationForm
