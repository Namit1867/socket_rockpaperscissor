import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MongooseModule} from '@nestjs/mongoose';
// require('dotenv').config({path: __dirname + './'});
// import * as dotenv from 'dotenv';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';

declare const module: any;


async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  console.log((process.env.NODE_ENV))

  var configServcie = app.get(ConfigService)

  const port = parseInt(configServcie.get('database.port'))

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();