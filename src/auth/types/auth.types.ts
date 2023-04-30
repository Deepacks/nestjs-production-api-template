import type { Request } from 'express'

export interface RequestUser {
  userId: string
}

export interface GuardedRequest extends Request {
  user: RequestUser
}
