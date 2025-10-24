import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sex, SexDocument } from './schema/sex.schema';

@Injectable()
export class SexService {
  constructor(@InjectModel(Sex.name) private sexModel: Model<SexDocument>) {}

  async create(data: Partial<Sex>) {
    const existing = await this.sexModel.findOne({ nomi: data.nomi });
    if (existing) throw new Error('Bu sex allaqachon mavjud');
    const sex = new this.sexModel(data);
    return sex.save();
  }

  async findAll() {
    return this.sexModel.find();
  }

  async update(id: string, data: Partial<Sex>) {
    const updated = await this.sexModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Sex topilmadi');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.sexModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Sex topilmadi');
    return { message: 'Sex o‘chirildi' };
  }
}
