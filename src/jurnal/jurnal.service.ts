// src/jurnal/jurnal.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jurnal, JurnalDocument } from './schema/jurnal.schema';

@Injectable()
export class JurnalService {
  constructor(
    @InjectModel(Jurnal.name) private jurnalModel: Model<JurnalDocument>,
  ) {}

  async create(data: Partial<Jurnal>) {
    const jurnal = new this.jurnalModel(data);
    return jurnal.save();
  }

  async findAll() {
    return this.jurnalModel
      .find()
      .populate('lokomotiv', 'nomi raqami')
      .populate('yechilganuzel', 'nomi raqami')
      .populate('quyilganuzel', 'nomi raqami')
      .populate('yechganXodim', 'ism familiya tabelRaqam')
      .populate('qoyganXodim', 'ism familiya tabelRaqam')
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const jurnal = await this.jurnalModel
      .findById(id)
      .populate('lokomotiv', 'nomi raqami')
      .populate('yechilganuzel', 'nomi raqami')
      .populate('quyilganuzel', 'nomi raqami')
      .populate('yechganXodim', 'ism familiya tabelRaqam')
      .populate('qoyganXodim', 'ism familiya tabelRaqam');
    if (!jurnal) throw new NotFoundException('Jurnal topilmadi');
    return jurnal;
  }

  async update(id: string, data: Partial<Jurnal>) {
    const updated = await this.jurnalModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Jurnal topilmadi');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.jurnalModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Jurnal topilmadi');
    return { message: 'Jurnal o‘chirildi' };
  }
}
