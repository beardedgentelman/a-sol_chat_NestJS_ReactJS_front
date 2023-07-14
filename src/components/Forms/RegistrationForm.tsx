import { FC, useEffect, useRef, useState } from 'react'

import { IRegistration, IRegistrationError } from 'types/types'

import { Link, useNavigate } from 'react-router-dom'

import BtnMain from 'components/ui/BtnMain/BtnMain'

import { useRegistrationMutation } from 'services/authService'

import { formRegistrationValidation } from './validation'

import './forms.css'

const RegistrationForm: FC = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues: IRegistration = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    formData.forEach((value, key) => {
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
        <input type='text' name='name' id='name' placeholder='Name' />
      </div>
      {formErrorsValidation.name && <span className='form__error'>{formErrorsValidation.name}</span>}

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
