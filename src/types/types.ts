export interface IRegistration {
  username: string
  email: string
  password: string
  confirmPassword?: string
}

export type IRegistrationError = Partial<Required<IRegistration>>

export interface IUser {
  username: string
  email: string
  userAvatar?: string
}

export interface IAuthState {
  user: IUser | null
  token: string
}

export interface IMessageState {
  text?: string
  user: IUser | null
  date: string
}
