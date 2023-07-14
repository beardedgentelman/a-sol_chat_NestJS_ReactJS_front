import * as Yup from 'yup'

export const formRegistrationValidation = Yup.object().shape({
  name: Yup.string().label('name').required('Name is required'),
  email: Yup.string()
    .label('email')
    .when('name', {
      is: (name: string) => !!name,
      then: () => Yup.string().required('Email is required').email('Invalid email')
    }),
  password: Yup.string()
    .label('password')
    .when('email', {
      is: (email: string) => !!email,
      then: () =>
        Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z]).+$/,
            'Password must contain at least one uppercase and one lowercase letter'
          )
          .required('Password is required')
    }),
  confirmPassword: Yup.string()
    .when('password', {
      is: (password: string) => !!password,
      then: () =>
        Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords is not match')
          .required('Confirm password is required')
    })
    .label('confirmPassword')
})
export const formLoginValidation = Yup.object().shape({
  email: Yup.string().label('email').required('Email is required').email('Invalid email'),
  password: Yup.string()
    .label('password')
    .when('email', {
      is: (email: string) => !!email,
      then: () =>
        Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z]).+$/,
            'Password must contain at least one uppercase and one lowercase letter'
          )
          .required('Password is required')
    })
})
