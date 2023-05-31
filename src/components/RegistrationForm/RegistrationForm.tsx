import { useRef, useState } from 'react'
import { IForm } from 'types/types'

import { formValidation } from './validation'

import './registration-form.css'

const RegistrationForm = () => {
  const [fileName, setFileName] = useState('Add avatar +')
  const [miniature, setMiniature] = useState('')
  const [formErrors, setFormErrors] = useState<any>({})

  const passwordRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
      setFileName(fileRef.current?.files[0].name)
      setMiniature(URL.createObjectURL(fileRef.current.files[0]))
    } else {
      return
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues: IForm = {
      email: '',
      password: ''
    }

    formData.forEach((value, key) => {
      if (key === 'file' && value instanceof File && value.size === 0) {
        return
      }
      formValues[key as keyof IForm] = value as any
    })

    try {
      await formValidation.validate(formValues, { abortEarly: false })
      setFormErrors({})
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const errors = err.inner.reduce((acc: any, curr: any) => {
          acc[curr.path] = curr.message
          return acc
        }, {})
        setFormErrors(errors)
        console.log(formErrors)
      }
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
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

      <div className='form__avatar-field'>
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
      {formErrors.file && <span className='form__error'>{formErrors.file}</span>}

      <input type='submit' className='form__submit' placeholder='Submit' />
    </form>
  )
}

export default RegistrationForm
