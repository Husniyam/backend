import { Types } from 'mongoose';

export class uzelDto {
  nomi: string;
  raqami: string;
  holati: string;
  sex: Types.ObjectId;
  lokomotiv: Types.ObjectId;
}
