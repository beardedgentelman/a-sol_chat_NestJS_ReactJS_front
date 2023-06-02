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
  isAuth: boolean
  user: IUser | null
}
