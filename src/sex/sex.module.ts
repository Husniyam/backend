import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sex, SexSchema } from './schema/sex.schema';
import { SexController } from './sex.controller';
import { SexService } from './sex.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sex.name, schema: SexSchema }])],
  controllers: [SexController],
  providers: [SexService],
  exports: [SexService],
})
export class SexModule {}
