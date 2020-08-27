import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { AppgatewayGateway } from './appgateway.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://fuzz:Pass123#@ds115931.mlab.com:15931/rocksquare')
  ],
  controllers: [AppController],
  providers: [AppService, AppgatewayGateway],
})
export class AppModule {}
