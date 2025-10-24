import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SexDocument = Sex & Document;

@Schema({ timestamps: true })
export class Sex {
  @Prop({ required: true, unique: true })
  nomi: string;

  @Prop()
  joylashuv: string;
}

export const SexSchema = SchemaFactory.createForClass(Sex);
