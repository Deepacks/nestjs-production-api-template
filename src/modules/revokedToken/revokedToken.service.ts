import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  RevokedToken,
  RevokedTokenDocument,
} from '../../schemas/revokedToken.schema';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class RevokedTokenService {
  constructor(
    @InjectModel(RevokedToken.name)
    private revokedTokenModel: Model<RevokedTokenDocument>,
  ) {}

  async revoke(jwt: TokenDto) {
    const { userId, iat, exp } = jwt;
    await this.revokedTokenModel.create({ userId, iat, exp });
  }

  async find(jwt: TokenDto): Promise<RevokedTokenDocument> {
    const { userId, iat, exp } = jwt;
    const revokedToken = await this.revokedTokenModel
      .findOne({ userId, iat, exp })
      .exec();
    return revokedToken;
  }
}
