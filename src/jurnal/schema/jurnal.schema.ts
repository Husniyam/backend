// src/jurnal/schema/jurnal.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Lokomotiv } from 'src/lokomotiv/schema/lokomotiv.schema';
import { Uzel } from 'src/lokomotiv/schema/uzel.schema';
import { Xodim } from 'src/xodim/schema/xodim.schema';

export type JurnalDocument = Jurnal & Document;

@Schema({ timestamps: true })
export class Jurnal {
  @Prop({ type: Types.ObjectId, ref: Lokomotiv.name, required: true })
  lokomotiv: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Uzel.name })
  yechilganuzel: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Uzel.name })
  quyilganuzel: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Xodim.name })
  yechganXodim: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Xodim.name })
  qoyganXodim: Types.ObjectId;

  @Prop({ required: true })
  tamirTuri: string; // Masalan: Joriy, Katta, O‘rta

  @Prop({
    enum: ['Yechildi', 'O‘rnatildi', 'Tugallangan'],
    default: 'Yechildi',
  })
  status: string;

  @Prop()
  yechilganSana: Date;

  @Prop()
  qoyilganSana: Date;
}

export const JurnalSchema = SchemaFactory.createForClass(Jurnal);
