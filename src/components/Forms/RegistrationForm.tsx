import { FC, useEffect, useRef, useState } from 'react'

import { IRegistration, IRegistrationError } from 'types/types'

import { Link, useNavigate } from 'react-router-dom'

import BtnMain from 'components/ui/BtnMain/BtnMain'

import { useRegistrationMutation } from 'services/authService'

import { formRegistrationValidation } from './validation'

import './forms.css'

const RegistrationForm: FC = () => {
  // TODO: replace to update user form
  // const [fileName, setFileName] = useState('Add avatar +')
  // const [miniature, setMiniature] = useState('')
  const [formDispatched, setFormDispatched] = useState(false)
  const [formErrorsValidation, setFormErrorsValidation] = useState<IRegistrationError>({})

  const [registration, { isLoading, error }] = useRegistrationMutation()

  const passwordRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (formDispatched && !isLoading && !error) {
      navigate('/chats')
    }
  }, [formDispatched, isLoading, error, navigate])
  // TODO: replace to update user form
  // const fileRef = useRef<HTMLInputElement>(null)

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
      password: '',
      confirmPassword: ''
    }

    formData.forEach((value, key) => {
      // TODO: replace to update user form
      // if (key === 'file' && value instanceof File && value.size === 0) {
      //   return
      // }
      formValues[key as keyof IRegistration] = value as string
    })

    try {
      await formRegistrationValidation
        .validate(formValues, { abortEarly: false })
        .then(() => setFormErrorsValidation({}))
        .then(() => delete formValues.confirmPassword)
        .then(() => registration(formValues))
        .then(() => {
          if (e.currentTarget !== null) {
            e.currentTarget.reset()
          }
          setFormDispatched(true)
        })
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const validationErrors = err.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = curr.message
          return acc
        }, {})
        setFormErrorsValidation(validationErrors)
      }
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      {error ? (
        (error as any).data ? (
          <span className='form__error-server'>{(error as any).data.message}</span>
        ) : (
          <span className='form__error-server'>{(error as any).status}</span>
        )
      ) : (
        <h1 className='form__title'>Registration</h1>
      )}
      <div className='form__field'>
        <input type='text' name='username' id='username' placeholder='Name' />
      </div>
      {formErrorsValidation.username && <span className='form__error'>{formErrorsValidation.username}</span>}

      <div className='form__field'>
        <input type='email' name='email' id='email' placeholder='Email' />
      </div>
      {formErrorsValidation.email && <span className='form__error'>{formErrorsValidation.email}</span>}

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
      {formErrorsValidation.password && <span className='form__error'>{formErrorsValidation.password}</span>}

      <div className='form__field'>
        <input type='password' name='confirmPassword' id='confirmPassword' placeholder='Confirm password' />
      </div>
      {formErrorsValidation.confirmPassword && (
        <span className='form__error'>{formErrorsValidation.confirmPassword}</span>
      )}

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
      {formErrorsValidation.file && <span className='form__error'>{formErrorsValidation.file}</span>} */}

      <BtnMain type='submit' className='form__submit' disabled={isLoading && true}>
        {!isLoading ? <span>Submit</span> : <span className='form__loading'></span>}
      </BtnMain>
      <span className='form__link'>
        Already have an account? Just <Link to='/login'>login</Link>!
      </span>
    </form>
  )
}

export default RegistrationForm
