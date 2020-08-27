import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { configss} from './Config/configuration';
import * as dotEnvOptions from "./Config/dotenv-options"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService:ConfigService,private  configser:configss) {}
    
  @Get()
  getHello(): string {

    const dbhost = this.configService.get<string>('database.port')
    console.log(dbhost)
    console.log(dotEnvOptions)
    // console.log(this.configser.port);
    // console.log(this.configService.get('PORT'))
    
    return this.appService.getHello();
  }
}
