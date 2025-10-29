import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Uzel, UzelSchema } from 'src/lokomotiv/schema/uzel.schema';
import { Uzeltype, UzeltypeSchema } from './schema/uzeltype.schema';
import { UzeltypeController } from './uzeltype.controller';
import { UzeltypeService } from './uzeltype.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Uzeltype.name, schema: UzeltypeSchema },
      { name: Uzel.name, schema: UzelSchema },
    ]),
  ],
  controllers: [UzeltypeController],
  providers: [UzeltypeService],
})
export class UzeltypeModule {}
