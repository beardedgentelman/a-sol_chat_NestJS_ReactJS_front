export interface IRegistration {
  name: string
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
  name: string
  email: string
  avatar?: string | null
}

export interface IAuthState {
  user: IUser | null
  token: string
}

export interface IMessageState {
  messSocket: string | null
  text: string | null
  date: string | null
}
