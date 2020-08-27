import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService:ConfigService) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get('PORT'))
    return this.appService.getHello();
  }
}
