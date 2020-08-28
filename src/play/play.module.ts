import { Module } from '@nestjs/common';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'user',schema:'user'}])],
  controllers: [PlayController],
  providers: [PlayService]
})
export class PlayModule {}
