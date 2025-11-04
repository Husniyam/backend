// src/jurnal/jurnal.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Uzel, UzelDocument } from 'src/lokomotiv/schema/uzel.schema';
import { Jurnal, JurnalDocument } from './schema/jurnal.schema';

@Injectable()
export class JurnalService {
  constructor(
    @InjectModel(Jurnal.name) private jurnalModel: Model<JurnalDocument>,
    @InjectModel(Uzel.name) private uzelModel: Model<UzelDocument>,
  ) {}

  async create(data: Partial<Jurnal>) {
    const jurnal = new this.jurnalModel(data);
    await Promise.all([
      this.uzelModel.findByIdAndUpdate(data.yechilganuzel, {
        holati: 'Tamirda',
      }),
    ]);

    return jurnal.save();
  }

  async findAll() {
    const jurnallar = await this.jurnalModel
      .find()
      .populate({
        path: 'lokomotiv',
        select: 'nomi zavodRaqami', // lokomotivdagi kerakli fieldlar
      })
      .populate({
        path: 'yechilganuzel',
        select: 'raqami uzeltype',
        populate: {
          path: 'uzeltype',
          select: 'nomi korikmuddat',
        },
      })
      .populate({
        path: 'qoyilganuzel',
        select: 'raqami uzeltype',
        populate: {
          path: 'uzeltype',
          select: 'nomi korikmuddat',
        },
      })
      .populate({
        path: 'yechganXodim',
        select: 'ism familiya tabelRaqam',
      })
      .populate({
        path: 'qoyganXodim',
        select: 'ism familiya tabelRaqam',
      })
      .sort({ createdAt: -1 })
      .lean(); // natija toza JS obyekt bo‘lib qaytadi (JSON)

    // 🔧 Bo‘sh joylarga default qiymat beramiz
    return jurnallar.map((j) => ({
      ...j,
      qoyilganuzel: j.qoyilganuzel || {
        _id: null,
        uzeltype: { _id: null, nomi: '', korikmuddat: '' },
        raqami: '',
      },
      qoyganXodim: j.qoyganXodim || {
        _id: null,
        ism: '',
        familiya: '',
      },
      qoyilganSana: j.qoyilganSana || '',
    }));
  }

  async findOne(id: string) {
    const jurnal = await this.jurnalModel
      .findById(id)
      .populate({
        path: 'lokomotiv',
        select: 'nomi zavodRaqami', // lokomotivdagi kerakli fieldlar
      })
      .populate({
        path: 'yechilganuzel',
        select: 'raqami uzeltype',
        populate: {
          path: 'uzeltype',
          select: 'nomi korikmuddat',
        },
      })
      .populate({
        path: 'qoyilganuzel',
        select: 'raqami uzeltype',
        populate: {
          path: 'uzeltype',
          select: 'nomi korikmuddat',
        },
      })
      .populate({
        path: 'yechganXodim',
        select: 'ism familiya tabelRaqam',
      })
      .populate({
        path: 'qoyganXodim',
        select: 'ism familiya tabelRaqam',
      });
    if (!jurnal) throw new NotFoundException('Jurnal topilmadi');
    return jurnal;
  }

  async update(id: string, data: Partial<Jurnal>) {
    const updated = await this.jurnalModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Jurnal topilmadi');
    await Promise.all([
      this.uzelModel.findByIdAndUpdate(data.qoyilganuzel, {
        holati: 'Ish holatida',
        lokomotiv: data.lokomotiv,
      }),
    ]);
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.jurnalModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Jurnal topilmadi');
    return { message: 'Jurnal o‘chirildi' };
  }
}
