import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Jurnal, JurnalSchema } from 'src/jurnal/schema/jurnal.schema';
import { LokomotivController } from './lokomotiv.controller';
import { LokomotivService } from './lokomotiv.service';
import { Lokomotiv, LokomotivSchema } from './schema/lokomotiv.schema';
import { Uzel, UzelSchema } from './schema/uzel.schema';
import { UzelController } from './uzel.controller';
import { UzelService } from './uzel.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lokomotiv.name, schema: LokomotivSchema },
      { name: Uzel.name, schema: UzelSchema },
      { name: Jurnal.name, schema: JurnalSchema },
    ]),
  ],
  providers: [LokomotivService, UzelService],
  controllers: [LokomotivController, UzelController],
})
export class LokomotivModule {}
