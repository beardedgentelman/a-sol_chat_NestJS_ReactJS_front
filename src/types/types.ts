export interface IRegistration {
  username: string
  email: string
  password: string
  confirmPassword?: string
}
export interface ILogin {
  email: string
  password: string
}

export type IRegistrationError = Partial<Required<IRegistration>>
export type ILoginError = Partial<Required<ILogin>>

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
  text: string | null
  date: string | null
}
