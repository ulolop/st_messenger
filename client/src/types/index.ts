export interface IChatMessage {
  author: string
  avatar?: string
  data: IMessageData | IGifData
  time: number
}
export interface IMessageData {
  type: 'message'
  text: string
  file?: File
}

export interface IGifData {
  type: 'gif'
  url: string
  description: string
  wigth: number
  height: number
}

export interface IChatRoom {
  name: string
  avatar?: string
  role: string
  online: boolean
}

export interface IUserInfo {
  name: string
  avatar?: string
  role: string
  email: string
  phone: string
}

export interface IChatServerData {
  type: 'room' | 'messages'
  data: IChatRoom | IChatMessage[]
}

export interface IChatSliceState {
  room: IChatRoom
  messages: IChatMessage[]
}

export interface IInfoSliceState {
  userInfo: IUserInfo | null
  notifications: IChatMessage[]
}