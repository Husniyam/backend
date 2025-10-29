import { Types } from 'mongoose';

export class UserDto {
  _id: Types.ObjectId;
  role: string;
  jshshir: string;
  password: string;
}
