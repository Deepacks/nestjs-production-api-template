import { Request } from 'express';

export interface RequestUser {
  userId: string;
}

export interface AuthRequest extends Request {
  user: RequestUser;
}
