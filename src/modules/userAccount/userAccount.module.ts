import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserAccount,
  UserAccountSchema,
} from '../../schemas/userAccount.schema';
import { UserAccountController } from './userAccount.controller';
import { UserAccountService } from './userAccount.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: UserAccountSchema },
    ]),
  ],
  controllers: [UserAccountController],
  providers: [UserAccountService],
  exports: [UserAccountService],
})
export class UserAccountModule {}
