export interface IRegistration {
  username: string
  email: string
  password: string
  confirmPassword?: string
}

export interface IRegistrationError {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export interface IUser {
  username: string
  email: string
  userAvatar?: string
}

export interface IAuthState {
  isAuth: boolean
  user: IUser | null
}
