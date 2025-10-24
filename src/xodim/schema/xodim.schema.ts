import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Sex } from 'src/sex/schema/sex.schema';

export type XodimDocument = Xodim & Document;

@Schema({ timestamps: true })
export class Xodim {
  @Prop({ required: true, unique: true })
  jshshir: string;

  @Prop({ required: true })
  ism: string;

  @Prop({ required: true })
  familiya: string;

  @Prop({ required: true })
  tabelRaqam: string;

  @Prop()
  tel: string;

  @Prop()
  email: string;

  @Prop({ type: Types.ObjectId, ref: Sex.name, required: true })
  sex: Types.ObjectId;
}

export const XodimSchema = SchemaFactory.createForClass(Xodim);
