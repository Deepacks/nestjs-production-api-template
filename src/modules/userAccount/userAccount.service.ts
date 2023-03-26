import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserAccount } from '../../schemas/userAccount.schema';
import { UserSessionDto } from './dto/userSession.dto';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel(UserAccount.name)
    private userAccountModel: Model<UserAccount>,
  ) {}

  async create(email: string, hash: string): Promise<UserAccount> {
    return this.userAccountModel.create({ email, hash });
  }

  async findById(
    id: string,
    options: { [key: string]: boolean } = {},
  ): Promise<UserAccount> {
    return this.userAccountModel.findOne({ _id: id }, options);
  }

  async findByEmail(
    email: string,
    options: { [key: string]: boolean } = {},
  ): Promise<UserAccount> {
    return this.userAccountModel.findOne({ email }, options);
  }

  async getUserDataById(id: string): Promise<UserSessionDto> {
    return this.findById(id, {
      _id: false,
      email: true,
    });
  }

  async delete(id: string) {
    await this.userAccountModel.findOneAndDelete({ _id: id });
  }
}
