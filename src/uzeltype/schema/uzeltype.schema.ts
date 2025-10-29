import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UzeltypeDocument = Uzeltype & Document;

@Schema()
export class Uzeltype {
  @Prop({ unique: true, required: true })
  nomi: string;

  @Prop()
  description: string;

  @Prop({ default: '6' })
  korikmuddat: string;
}

export const UzeltypeSchema = SchemaFactory.createForClass(Uzeltype);
