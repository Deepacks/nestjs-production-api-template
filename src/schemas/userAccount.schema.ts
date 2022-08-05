import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class UserAccount {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  hash: string;
}

export type UserAccountDocument = UserAccount & Document;

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
