// src/lokomotiv/uzel.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Jurnal, JurnalDocument } from 'src/jurnal/schema/jurnal.schema';
import { Uzel, UzelDocument } from './schema/uzel.schema';

@Injectable()
export class UzelService {
  constructor(
    @InjectModel(Uzel.name) private uzelModel: Model<UzelDocument>,
    @InjectModel(Jurnal.name) private jurnalModel: Model<JurnalDocument>,
  ) {}

  async create(data: Partial<Uzel>) {
    const uzel = new this.uzelModel(data);
    return uzel.save();
  }

  async findAll() {
    return this.uzelModel
      .find()
      .populate('uzeltype', 'nomi korikmuddat')
      .populate('sex', 'nomi')
      .populate('lokomotiv', 'nomi zavodRaqami');
  }

  // 🔹 Barcha uzellarni olish (va so‘nggi jurnalni qo‘shish)
  async findAllBy() {
    const uzellar = await this.uzelModel
      .find()
      .populate('uzeltype', 'nomi korikmuddat')
      .populate('sex', 'nomi')
      .populate('lokomotiv', 'nomi zavodRaqami')
      .sort({ createdAt: -1 })
      .lean(); // .lean() => natijani plain JS objectga aylantiradi

    // 🔹 Har bir uzel uchun eng so‘nggi jurnalni topish
    const results = await Promise.all(
      uzellar.map(async (uzel) => {
        const lastJurnal = await this.jurnalModel
          .findOne({
            $or: [
              { yechilganuzel: uzel._id.toString() },
              { quyilganuzel: uzel._id.toString() },
            ],
          })
          .sort({ updatedAt: -1 })
          .populate([
            { path: 'yechganXodim', select: 'ism familiya tabelRaqam' },
            { path: 'qoyganXodim', select: 'ism familiya tabelRaqam' },
          ])
          .lean();

        let xodim: Types.ObjectId | null = null;
        let sana: Date | null = null;
        let tamirTuri: string | null = null;
        if (lastJurnal) {
          tamirTuri = lastJurnal.tamirTuri;

          if (uzel.holati === 'Ish holatida') {
            xodim = lastJurnal.qoyganXodim;
            sana = lastJurnal.qoyilganSana;
          } else if (['Ta’mirda', 'Kutishda'].includes(uzel.holati)) {
            xodim = lastJurnal.yechganXodim;
            sana = lastJurnal.yechilganSana;
          }
        }

        return {
          ...uzel,
          xodim: xodim || null,
          tamirTuri: tamirTuri || null,
          sana: sana || null,
        };
      }),
    );

    return results;
  }

  async findAllByNomi(id: string) {
    const uzellar = await this.uzelModel
      .find({ uzeltype: id })
      .populate('uzeltype', 'nomi korikmuddat')
      .populate('sex', 'nomi')
      .populate('lokomotiv', 'nomi zavodRaqami')
      .sort({ createdAt: -1 })
      .lean(); // .lean() => natijani plain JS objectga aylantiradi

    // 🔹 Har bir uzel uchun eng so‘nggi jurnalni topish
    const results = await Promise.all(
      uzellar.map(async (uzel) => {
        const lastJurnal = await this.jurnalModel
          .findOne({
            $or: [
              { yechilganuzel: uzel._id.toString() },
              { quyilganuzel: uzel._id.toString() },
            ],
          })
          .sort({ updatedAt: -1 })
          .populate([
            { path: 'yechganXodim', select: 'ism familiya tabelRaqam' },
            { path: 'qoyganXodim', select: 'ism familiya tabelRaqam' },
          ])
          .lean();

        let xodim: Types.ObjectId | null = null;
        let sana: Date | null = null;
        let tamirTuri: string | null = null;
        if (lastJurnal) {
          tamirTuri = lastJurnal.tamirTuri;

          if (uzel.holati === 'Ish holatida') {
            xodim = lastJurnal.qoyganXodim;
            sana = lastJurnal.qoyilganSana;
          } else if (['Ta’mirda', 'Kutishda'].includes(uzel.holati)) {
            xodim = lastJurnal.yechganXodim;
            sana = lastJurnal.yechilganSana;
          }
        }

        return {
          ...uzel,
          xodim: xodim || null,
          tamirTuri: tamirTuri || null,
          sana: sana || null,
        };
      }),
    );

    return results;
  }

  async findAllbyloko(lokomotivId?: string) {
    const filter = lokomotivId ? { lokomotivId } : {};
    return this.uzelModel
      .find(filter)
      .populate('uzeltype', 'nomi korikmuddat')
      .populate('lokomotiv', 'nomi zavodRaqami');
  }

  async findOne(id: string) {
    const uzel = await this.uzelModel
      .findById(id)
      .populate('uzeltype', 'nomi korikmuddat')
      .populate('sex', 'nomi')
      .populate('lokomotiv', 'nomi raqami');
    if (!uzel) throw new NotFoundException('Uzel topilmadi');
    return uzel;
  }

  async update(id: string, data: Partial<Uzel>) {
    const updated = await this.uzelModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Uzel topilmadi');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.uzelModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Uzel topilmadi');
    return { message: 'Uzel o‘chirildi' };
  }
}
