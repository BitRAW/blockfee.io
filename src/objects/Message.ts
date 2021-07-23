export enum MessageType {
  new_block = 'new_block',
}

export interface Message {
  type: string | MessageType,
  payload: any
}
