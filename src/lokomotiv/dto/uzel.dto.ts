import { Types } from 'mongoose';

export class uzelDto {
  uzeltype: Types.ObjectId;
  raqami: string;
  holati: string;
  sana: Date;
  sex: Types.ObjectId;
  lokomotiv: Types.ObjectId;
}
