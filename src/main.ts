import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MongooseModule} from '@nestjs/mongoose';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.Node_ENV);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();