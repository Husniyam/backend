// src/lokomotiv/lokomotiv.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lokomotiv, LokomotivDocument } from './schema/lokomotiv.schema';

@Injectable()
export class LokomotivService {
  constructor(
    @InjectModel(Lokomotiv.name) private model: Model<LokomotivDocument>,
  ) {}

  async create(data: Partial<Lokomotiv>) {
    const newItem = new this.model(data);
    return newItem.save();
  }

  async findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }

  async update(id: string, data: Partial<Lokomotiv>) {
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Lokomotiv topilmadi');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Lokomotiv topilmadi');
    return { message: 'Lokomotiv o‘chirildi' };
  }
}
