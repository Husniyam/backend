import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Xodim, XodimDocument } from './schema/xodim.schema';

@Injectable()
export class XodimService {
  constructor(
    @InjectModel(Xodim.name) private xodimModel: Model<XodimDocument>,
  ) {}

  async create(data: Partial<Xodim>) {
    const existing = await this.xodimModel.findOne({ jshshir: data.jshshir });
    if (existing) throw new Error('Bu xodim allaqachon mavjud');
    const xodim = new this.xodimModel(data);
    return xodim.save();
  }

  async findAll() {
    return this.xodimModel.find().populate('sex', 'nomi');
  }

  async update(id: string, data: Partial<Xodim>) {
    const updated = await this.xodimModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Xodim topilmadi');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.xodimModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Xodim topilmadi');
    return { message: 'Xodim o‘chirildi' };
  }
}
