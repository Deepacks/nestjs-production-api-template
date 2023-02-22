import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash as genHash } from 'bcryptjs';

import {
  UserAccount,
  UserAccountDocument,
} from '../../schemas/userAccount.schema';
import { UserAuthDto } from './dto/userAuth.dto';
import { UserSessionDto } from './dto/userSession.dto';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel(UserAccount.name)
    private userAccountModel: Model<UserAccountDocument>,
  ) {}

  async create(userAuthDto: UserAuthDto): Promise<UserAccount> {
    const { email, password } = userAuthDto;

    const userInDb = await this.findByEmail(email);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = await genSalt(10);
    const hash = await genHash(password, salt);

    const user = await this.userAccountModel.create({ email, hash });
    return user;
  }

  async findById(
    id: string,
    options: { [key: string]: boolean } = {},
  ): Promise<UserAccountDocument> {
    return this.userAccountModel.findOne({ _id: id }, options).exec();
  }

  async findByEmail(
    email: string,
    options: { [key: string]: boolean } = {},
  ): Promise<UserAccountDocument> {
    return this.userAccountModel.findOne({ email }, options).exec();
  }

  async getUserSessionById(id: string): Promise<UserSessionDto> {
    return this.findById(id, {
      _id: true,
      email: true,
    });
  }

  async delete(id: string) {
    await this.userAccountModel.findOneAndDelete({ _id: id });
  }
}
