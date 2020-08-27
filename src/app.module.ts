import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import 'dotenv/config';
import {ConfigModule,ConfigService} from '@nestjs/config'
import {  configss } from './Config/configuration';
import configuration from './Config/configuration';
import * as dotenv from 'dotenv';
// import {} '../development.env'
// import { config } from 'process';

// console.log(process.env.URL)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[ 'C://MyProjects//rps-roshambo-backend-staging//env//development.env', 'C://MyProjects//rps-roshambo-backend-staging//env//.env',],
      // ignoreEnvFile:true,
      load:[configuration]
    }),

    MongooseModule.forRootAsync({useFactory: (configService: ConfigService) => ({
          uri:configService.get<string>('URL')
        }),
        
        inject: [ConfigService],},
        
        )
  ],
  controllers: [AppController],
  providers: [AppService, configss],
})
export class AppModule {}
