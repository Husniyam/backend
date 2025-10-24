import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoDBConfig } from './config/mongo.config';
import { JurnalModule } from './jurnal/jurnal.module';
import { LokomotivModule } from './lokomotiv/lokomotiv.module';
import { SexModule } from './sex/sex.module';
import { UserModule } from './user/user.module';
import { XodimModule } from './xodim/xodim.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    UserModule,
    AuthModule,
    LokomotivModule,
    SexModule,
    XodimModule,
    JurnalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
