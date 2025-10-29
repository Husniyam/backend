import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Uzel, UzelDocument } from 'src/lokomotiv/schema/uzel.schema';
import { Xodim, XodimDocument } from 'src/xodim/schema/xodim.schema';
import { Sex, SexDocument } from './schema/sex.schema';

@Injectable()
export class SexService {
  constructor(
    @InjectModel(Sex.name) private sexModel: Model<SexDocument>,
    @InjectModel(Uzel.name) private uzelModel: Model<UzelDocument>,
    @InjectModel(Xodim.name) private xodimModel: Model<XodimDocument>,
  ) {}

  async create(data: Partial<Sex>) {
    const existing = await this.sexModel.findOne({ nomi: data.nomi });
    if (existing) throw new Error('Bu sex allaqachon mavjud');
    const sex = new this.sexModel(data);
    return sex.save();
  }

  async findAll() {
    const sexlar = await this.sexModel.find();

    const result = await Promise.all(
      sexlar.map(async (sex) => {
        const sexId = (sex._id as Types.ObjectId).toString();
        const [xodimsoni, uzelsoni] = await Promise.all([
          this.xodimModel.countDocuments({ sex: sexId }),
          this.uzelModel.countDocuments({
            sex: sex._id,
            holati: { $ne: 'Ish holatida' }, // Ish holatida bo‘lmaganlar
          }),
        ]);

        return {
          ...sex.toObject(),
          xodimsoni,
          uzelsoni,
        };
      }),
    );

    return result;
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
