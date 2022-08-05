import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class RevokedToken {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  iat: number;

  @Prop({ required: true })
  exp: number;
}

export type RevokedTokenDocument = RevokedToken & Document;

export const RevokedTokenSchema = SchemaFactory.createForClass(RevokedToken);
