// src/jurnal/jurnal.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JurnalController } from './jurnal.controller';
import { JurnalService } from './jurnal.service';
import { Jurnal, JurnalSchema } from './schema/jurnal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jurnal.name, schema: JurnalSchema }]),
  ],
  controllers: [JurnalController],
  providers: [JurnalService],
  exports: [JurnalService],
})
export class JurnalModule {}
