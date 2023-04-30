export type MessageStatus = 'Inviato' | 'Ricevuto'

export class MessageDto {
  id: string
  timestamp: Date
  recipient: string
  text: string
  status: MessageStatus
}
export type MessageResponse = MessageDto[]
