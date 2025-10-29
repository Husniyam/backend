// src/lokomotiv/schema/uzel.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Sex } from 'src/sex/schema/sex.schema';
import { Lokomotiv } from './lokomotiv.schema';

export type UzelDocument = Uzel & Document;

@Schema({ timestamps: true })
export class Uzel {
  @Prop({ required: true })
  nomi: string;

  @Prop({ required: true })
  raqami: string;

  @Prop({ default: 'Ish holatida' })
  holati: string; // Ish holatida | Ta'mirda | Kutishda

  @Prop()
  sana: Date;

  @Prop({ type: Types.ObjectId, ref: Sex.name })
  sex: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Lokomotiv.name })
  lokomotiv: Types.ObjectId;
}

export const UzelSchema = SchemaFactory.createForClass(Uzel);
