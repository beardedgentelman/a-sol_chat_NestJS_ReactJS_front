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
export interface IUpdate {
  name: string
  email: string
  avatar: File | null
}

export type IRegistrationError = Partial<Required<IRegistration>>
export type IUpdateError = Partial<Required<IUpdate>>
export type ILoginError = Partial<Required<ILogin>>

export interface IAuthState {
  user: IUser | null
  token: string
}

export interface IUser {
  id: number | null
  name: string
  email: string
  chats?: IChat[] | null
  avatar?: string | null
}

export interface IChat {
  id: number
  ownerId: number
  name: string
  users: IUser[]
}

export interface IMessage {
  id: string | null
  userId: number | null
  chatId: number | null
  text: string | null
  date: string | null
}
