import { useRef, useState } from 'react'

import './registration-form.css'

interface IFormSubmit {
  email: string
  password: string
  avatar?: File | null
}

interface IFormValidate {
  email: string
  emailError: boolean
  emailRegExError: boolean
  password: string
  passwordError: boolean
  passwordRegExError: boolean
  avatar: File | null
  avatarError: boolean
}

const RegistrationForm = () => {
  const [formValid, setFormValid] = useState<IFormValidate>({
    email: '',
    emailError: false,
    emailRegExError: false,
    password: '',
    passwordError: false,
    passwordRegExError: false,
    avatar: null,
    avatarError: false
  })

  const [fileName, setFileName] = useState('Add avatar +')
  const [miniature, setMiniature] = useState('')

  const formRef = useRef<HTMLFormElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const formValidate = (e: any) => {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/

    if (formValid.email === '' || formValid.email === undefined || formValid.email === null) {
      setFormValid({ ...formValid, emailError: true })
      return
    } else {
      if (emailRegex.test(formValid.email) === false) {
        setFormValid({ ...formValid, emailRegExError: true })
        setFormValid({ ...formValid, emailError: false })
        return
      } else {
        setFormValid({ ...formValid, emailRegExError: false })
        setFormValid({ ...formValid, emailError: true })
      }
      setFormValid({ ...formValid, emailError: false })
    }

    if (formValid.password === '' || formValid.password === undefined || formValid.password === null) {
      setFormValid({ ...formValid, passwordError: true })
      return
    } else {
      if (passwordRegex.test(formValid.password) === false) {
        setFormValid({ ...formValid, passwordRegExError: true })
        setFormValid({ ...formValid, passwordError: false })
        return
      } else {
        setFormValid({ ...formValid, passwordRegExError: false })
        setFormValid({ ...formValid, passwordError: true })
      }
      setFormValid({ ...formValid, passwordError: false })
    }

    if (fileRef.current?.files !== null && fileRef.current?.files !== undefined && fileRef.current?.files.length > 0) {
      const newFileName = fileRef.current?.files[0].name
      setFileName(newFileName)
      setMiniature(URL.createObjectURL(fileRef.current.files[0]))
      setFormValid({ ...formValid, avatar: fileRef.current?.files[0] })
    }

    if (formValid.avatar !== null) {
      if (!formValid.avatar.type.includes('image')) {
        setFormValid({ ...formValid, avatarError: true })
        return
      }
      setFormValid({ ...formValid, avatarError: false })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formValidate(e)

    const formData: IFormSubmit = {
      email: formValid.email,
      password: formValid.password,
      avatar: formValid.avatar
    }

    console.log(formData)
  }

  return (
    <form ref={formRef} className='form' onSubmit={handleSubmit}>
      <div className='form__field'>
        <input
          ref={emailRef}
          onChange={e => {
            console.log(formValid)
            setFormValid({ ...formValid, email: e.target.value })
          }}
          type='email'
          name='email'
          id='email'
          placeholder='Email'
        />
      </div>
      {formValid.emailError && <span>Email is required. Please set the email!</span>}
      {formValid.emailRegExError && <span>Email is not valid!</span>}

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
      {formValid.passwordError && <span>Password is required. Please set the password!</span>}
      {formValid.passwordRegExError && (
        <span>
          Password is not valid. The password must contain at least one uppercase letter, one lowercase letter and one
          number!
        </span>
      )}

      <div className='form__avatar-field'>
        <button
          className='form__avatar-btn'
          type='button'
          onClick={() => {
            fileRef.current?.click()
          }}
        >
          {fileName}
          <input ref={fileRef} type='file' name='file' id='file' placeholder='Avatar' />
        </button>
        {formValid.avatarError ? (
          <span>File is not an image! Please choose the image.</span>
        ) : (
          miniature !== '' && (
            <div className='form__avatar-field_wrapper'>
              <img src={miniature} alt='Previous miniature' />
            </div>
          )
        )}
      </div>

      <input type='submit' className='form__submit' placeholder='Submit' />
    </form>
  )
}

export default RegistrationForm
