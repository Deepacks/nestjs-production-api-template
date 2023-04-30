import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  RevokedToken,
  RevokedTokenSchema,
} from '../../schemas/revokedToken.schema'
import { RevokedTokenService } from './revokedToken.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RevokedToken.name, schema: RevokedTokenSchema },
    ]),
  ],
  providers: [RevokedTokenService],
  exports: [RevokedTokenService],
})
export class RevokedTokenModule {}
