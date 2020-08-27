import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import {MongooseModule} from '@nestjs/mongoose'
import { AppgatewayGateway } from './appgateway.gateway';
=======
import {MongooseModule} from '@nestjs/mongoose';
import 'dotenv/config';
import {ConfigModule,ConfigService} from '@nestjs/config'
>>>>>>> f16d15808d36b7fdcb2a6c4f99d5a4aed220505d

// console.log(process.env.URL)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    // MongooseModule.forRoot('mongodb://fuzz:Pass123#@ds115931.mlab.com:15931/rocksquare')
    // MongooseModule.forRoot(process.env.URL)
    MongooseModule.forRootAsync({useFactory: (configService: ConfigService) => ({
          uri:configService.get<string>('URL')
        }),
        inject: [ConfigService],})
  ],
  controllers: [AppController],
  providers: [AppService, AppgatewayGateway],
})
export class AppModule {}
