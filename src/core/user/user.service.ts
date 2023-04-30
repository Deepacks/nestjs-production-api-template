import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/schemas/user.schema'
import type { UserSessionDto } from './dto/userSession-dto.type'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: {
    username: string
    hash: string
    defaultSender?: string
  }): Promise<User> {
    return this.userModel.create(user)
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username })
  }

  async getUserData(id: string): Promise<UserSessionDto> {
    return this.userModel.findById(id, {
      _id: false,
      hash: false,
      __v: false,
    })
  }
}
