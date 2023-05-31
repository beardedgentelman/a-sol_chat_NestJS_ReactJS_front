import * as Yup from 'yup'

export const formValidation = Yup.object().shape({
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
    }),
  file: Yup.mixed()
    .label('file')
    .when(['email', 'password'], {
      is: (email: string, password: string) => email && password,
      then: () =>
        Yup.mixed().test('fileType', 'File must be an image', function (value: any) {
          if (!value) return true
          const supportedFormats = ['image/jpeg', 'image/png', 'image/gif']
          return supportedFormats.includes((value as File).type)
        })
    })
})
