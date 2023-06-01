export interface IRegistration {
  username: string
  email: string
  password: string
}

export interface IRegistrationError {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export interface IAuthState {
  token: null | string
  user: null
}

export interface IUser {
  username: string
}
