import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { NotificationModule } from './notification/notification.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    NotificationModule,
    MongooseModule.forRoot("mongodb+srv://nj1867:namit@cluster0.x2ytv.gcp.mongodb.net/new3?retryWrites=true&w=majority"),
    RegisterModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
