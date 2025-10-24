// src/lokomotiv/schema/lokomotiv.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LokomotivDocument = Lokomotiv & Document;

@Schema()
export class Lokomotiv {
  @Prop({ required: true })
  nomi: string;

  @Prop()
  turi: string;

  @Prop()
  zavodRaqami: string;

  @Prop()
  ishlabChiqarilganYil: number;
}

export const LokomotivSchema = SchemaFactory.createForClass(Lokomotiv);
