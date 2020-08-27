import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import 'dotenv/config';
import {ConfigModule,ConfigService} from '@nestjs/config'

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
  providers: [AppService],
})
export class AppModule {}
