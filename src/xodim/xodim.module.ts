import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Xodim, XodimSchema } from './schema/xodim.schema';
import { XodimController } from './xodim.controller';
import { XodimService } from './xodim.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Xodim.name, schema: XodimSchema }]),
  ],
  controllers: [XodimController],
  providers: [XodimService],
  exports: [XodimService],
})
export class XodimModule {}
