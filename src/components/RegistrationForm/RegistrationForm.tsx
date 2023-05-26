import { SubmitHandler, useForm } from 'react-hook-form'

import './registration-form.css'

interface IFormInput {
  email: string
  password: string
  file?: FormData
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data)

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form__field'>
        <label>Email</label>
        <input type='email' {...register('email', { required: true, maxLength: 20 })} />
        {errors.email && 'Email name is required'}
      </div>

      <div className='form__field'>
        <label>Password</label>
        <input type='password' {...(register('password'), { required: true, maxLength: 20 })} />
        {errors.password && 'Password name is required'}
      </div>

      <div className='form__field'>
        <label>Avatar</label>
        <input type='file' {...register('file')} />
      </div>

      <input type='submit' />
    </form>
  )
}

export default RegistrationForm
