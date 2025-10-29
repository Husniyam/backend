import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Uzel, UzelDocument } from 'src/lokomotiv/schema/uzel.schema';
import { Uzeltype, UzeltypeDocument } from './schema/uzeltype.schema';

@Injectable()
export class UzeltypeService {
  constructor(
    @InjectModel(Uzeltype.name) private uzeltypeModel: Model<UzeltypeDocument>,
    @InjectModel(Uzel.name) private uzelModel: Model<UzelDocument>,
  ) {}

  async create(data: Partial<Uzeltype>) {
    const uzeltype = new this.uzeltypeModel(data);
    return uzeltype.save();
  }

  async findAll() {
    return await this.uzeltypeModel.find();
  }

  async findAllwith(): Promise<
    {
      // _id: string;
      nomi: string;
      description: string;
      korikmuddat: string;
      uzellarsoni: number;
      tamirdavriotgansoni: number;
      tamirgaozqoldisoni: number;
      tamiriyaxshi: number;
    }[]
  > {
    const uzelTypes = await this.uzeltypeModel.find().exec();

    const result = await Promise.all(
      uzelTypes.map(async (type) => {
        const typeName = type.nomi;
        const allUzels = await this.uzelModel.find({ nomi: typeName }).exec();

        const now = new Date();
        const korikmuddat = Number(type.korikmuddat); // oy hisobida
        const korikmuddatDays = korikmuddat * 30; // 1 oy ≈ 30 kun

        let tamirdavriotgansoni = 0;
        let tamirgaozqoldisoni = 0;
        let tamiriyaxshi = 0;

        allUzels.forEach((uzel) => {
          const sana = new Date(uzel.sana);
          const tamirgachaKun =
            korikmuddatDays -
            Math.floor(
              (now.getTime() - sana.getTime()) / (1000 * 60 * 60 * 24),
            );

          if (tamirgachaKun < 0) tamirdavriotgansoni++;
          else if (tamirgachaKun <= 7) tamirgaozqoldisoni++;
          else tamiriyaxshi++;
        });

        return {
          ...(type.toObject ? type.toObject() : type),
          uzellarsoni: allUzels.length,
          tamirdavriotgansoni,
          tamirgaozqoldisoni,
          tamiriyaxshi,
        };
      }),
    );

    return result;
  }

  // 🔹 Barcha uzellarni olish (va so‘nggi jurnalni qo‘shish)
  // async findAllBy() {
  // 	const uzeltypelar = await this.uzeltypeModel
  // 		.find()
  // 		.lean(); // .lean() => natijani plain JS objectga aylantiradi

  // 	// 🔹 Har bir uzel uchun eng so‘nggi jurnalni topish
  // 	const results = await Promise.all(
  // 		uzeltypelar.map(async (uzeltype) => {
  // 			const lastuzel = await this.uzelModel
  // 				.find(
  // 						{ nomi: uzeltype.nomi },
  // 				)
  // 				.lean();

  // 			let xodim: Types.ObjectId | null = null;
  // 			let sana: Date | null = null;
  // 			let tamirTuri: string | null = null;
  // 			if (lastJurnal) {
  // 				tamirTuri = lastJurnal.tamirTuri;

  // 				if (uzel.holati === 'Ish holatida') {
  // 					xodim = lastJurnal.qoyganXodim;
  // 					sana = lastJurnal.qoyilganSana;
  // 				} else if (['Ta’mirda', 'Kutishda'].includes(uzel.holati)) {
  // 					xodim = lastJurnal.yechganXodim;
  // 					sana = lastJurnal.yechilganSana;
  // 				}
  // 			}

  // 			return {
  // 				...uzel,
  // 				xodim: xodim || null,
  // 				tamirTuri: tamirTuri || null,
  // 				sana: sana || null,
  // 			};
  // 		}),
  // 	);

  // 	return results;
  // }

  async findOne(id: string) {
    const uzel = await this.uzeltypeModel.findById(id);
    if (!uzel) throw new NotFoundException('Uzel topilmadi');
    return uzel;
  }

  async update(id: string, data: Partial<Uzel>) {
    const updated = await this.uzeltypeModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Uzel turi topilmadi');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.uzeltypeModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Uzel turi topilmadi');
    return { message: 'Uzel turi o‘chirildi' };
  }
}
