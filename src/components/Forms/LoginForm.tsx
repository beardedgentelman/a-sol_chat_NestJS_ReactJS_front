import BtnMain from 'components/ui/BtnMain/BtnMain'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'services/authService'
import { ILogin, ILoginError } from 'types/types'

import { useAppSelector } from 'hooks/redux'

import { formLoginValidation } from './validation'
import './forms.css'

const LoginForm = () => {
  const [formDispatched, setFormDispatched] = useState(false)
  const [formErrorsValidation, setFormErrorsValidation] = useState<ILoginError>({})
  const user = useAppSelector(state => state.userReducer)
  const [login, { isLoading, error }] = useLoginMutation()

  const passwordRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (formDispatched && !isLoading && !error) {
      navigate(`/${user.name}`)
    }
  }, [formDispatched, isLoading, error, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues: ILogin = {
      email: '',
      password: ''
    }

    formData.forEach((value, key) => {
      formValues[key as keyof ILogin] = value as string
    })

    try {
      await formLoginValidation
        .validate(formValues, { abortEarly: false })
        .then(() => setFormErrorsValidation({}))
        .then(() => login(formValues))
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
        <h1 className='form__title'>Log In</h1>
      )}

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

      <BtnMain type='submit' className='form__submit' disabled={isLoading && true}>
        {!isLoading ? <span>Submit</span> : <span className='form__loading'></span>}
      </BtnMain>
      <span className='form__link'>
        Have no account? Just <Link to='/registration'>register</Link>!
      </span>
    </form>
  )
}

export default LoginForm
