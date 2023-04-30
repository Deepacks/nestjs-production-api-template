import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@Schema()
export class User {
  _id: ObjectId

  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  hash: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
