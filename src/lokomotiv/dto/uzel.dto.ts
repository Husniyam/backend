import { Types } from 'mongoose';

export class uzelDto {
  nomi: string;
  raqami: string;
  holati: string;
  sana: Date;
  sex: Types.ObjectId;
  lokomotiv: Types.ObjectId;
}
