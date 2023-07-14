import * as Yup from 'yup'

export const updateUserValidation = Yup.object().shape({
  name: Yup.string().label('name').required('Name is required'),
  email: Yup.string()
    .label('email')
    .when('name', {
      is: (name: string) => !!name,
      then: () => Yup.string().required('Email is required').email('Invalid email')
    }),
  avatar: Yup.mixed() // Update 'file' to 'avatar' here
    .label('avatar')
    .when(['name', 'email'], {
      is: (name: string, email: string) => name && email,
      then: () =>
        Yup.mixed().test('fileType', 'File must be an image', function (value: any) {
          if (!value) return true
          const supportedFormats = ['image/jpeg', 'image/png', 'image/gif']
          return supportedFormats.includes((value as File).type)
        })
    })
})
