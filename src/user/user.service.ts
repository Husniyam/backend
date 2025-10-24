import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByJshshir(jshshir: string) {
    return this.userModel.findOne({ jshshir });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async create(data: { jshshir: string; password: string; role?: string }) {
    const currentUser = await this.userModel.findOne({ jshshir: data.jshshir });
    if (currentUser)
      throw new UnauthorizedException('Bu Jshshir bilan foydalanuvchi mavjud!');
    const hashed = await bcrypt.hash(data.password, 10);
    const user = new this.userModel({ ...data, password: hashed });
    return user.save();
  }

  async update(
    id: string,
    data: { jshshir?: string; password?: string; role?: string },
  ) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    await user.save();
    return user;
  }

  async delete(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Foydalanuvchi topilmadi');
    return { message: 'Foydalanuvchi o‘chirildi' };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.userModel.findByIdAndUpdate(id, { refreshToken });
  }
}
