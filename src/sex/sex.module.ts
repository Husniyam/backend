import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Uzel, UzelSchema } from 'src/lokomotiv/schema/uzel.schema';
import { Xodim, XodimSchema } from 'src/xodim/schema/xodim.schema';
import { Sex, SexSchema } from './schema/sex.schema';
import { SexController } from './sex.controller';
import { SexService } from './sex.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sex.name, schema: SexSchema },
      { name: Uzel.name, schema: UzelSchema },
      { name: Xodim.name, schema: XodimSchema },
    ]),
  ],
  controllers: [SexController],
  providers: [SexService],
  exports: [SexService],
})
export class SexModule {}
