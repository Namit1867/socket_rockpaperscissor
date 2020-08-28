import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { NotificationModule } from './notification/notification.module';
import { RegisterModule } from './register/register.module';
import { AppgatewayGateway } from './appgateway.gateway';
import 'dotenv/config';
import {ConfigModule,ConfigService} from '@nestjs/config'
import {  configss } from './Config/configuration';
import configuration from './Config/configuration';
import * as dotenv from 'dotenv';
// import {} '../development.env'
// import { config } from 'process';
import { UserModule } from './models/user/user.module';
import { SocketModule } from './models/socket/socket.module';
import { RequiredModule } from './required/required.module';

// console.log(process.env.URL)
@Module({
  imports: [
    NotificationModule,
    // MongooseModule.forRoot("mongodb+srv://nj1867:namit@cluster0.x2ytv.gcp.mongodb.net/new3?retryWrites=true&w=majority"),
    RegisterModule,
    
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[ 'C://MyProjects//rps-roshambo-backend-staging//env//development.env', 'C://MyProjects//rps-roshambo-backend-staging//env//.env',],
      load:[configuration]
    }),

    MongooseModule.forRootAsync({useFactory: (configService: ConfigService) => ({
          uri:configService.get<string>('URL')
        }),
        inject: [ConfigService],},
        ),
    UserModule,
    SocketModule,
    RequiredModule,
    // MongooseModule.forRoot('mongodb://fuzz:Pass123#@ds115931.mlab.com:15931/rocksquare')
    // MongooseModule.forRoot(process.env.URL)
    // MongooseModule.forRootAsync({useFactory: (configService: ConfigService) => ({
    //       uri:configService.get<string>('URL')
    //     }),
    //     inject: [ConfigService],})
  ],
  controllers: [AppController],
  providers: [AppService, AppgatewayGateway,configss],
})
export class AppModule {}
