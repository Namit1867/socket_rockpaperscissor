import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MongooseModule} from '@nestjs/mongoose';
// require('dotenv').config({path: __dirname + './'});
// import * as dotenv from 'dotenv';
import 'dotenv/config';

declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("Rahul");

  console.log(process.env.URL);
  // console.log(process.config);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();