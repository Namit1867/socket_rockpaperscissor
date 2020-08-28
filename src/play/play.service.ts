import { Injectable } from '@nestjs/common';
import { playDto } from 'src/required/dto/play.dto';
import { Model } from 'mongoose';
import { user } from 'src/required/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayService {
     constructor(@InjectModel('user') private readonly user:Model<user>){}

    async play(playDto:playDto)
{
         var ans=0;
         const {card1,card2,user1,user2}=playDto
           if(card1!==card2)
           {
             console.log(card1+" "+card2);
            
             (card1=="rock")?
              (ans=(card2=="scissor")?1:0) : 
              ((card1=="paper") ? 
              (ans=(card2=="rock")?1:0) :
               ( (card1=="scissor")?(ans=(card2=="paper")?1:0):ans=-1))
             
             console.log(ans);
    
             if(ans==1){
              const user= await this.user.find().where('username').equals(user2).exec();
              console.log(user)
              user[0].stars--
              user[0].save();
             }
             else if(ans==0){
              const user= await this.user.find().where('username').equals(user1).exec();
              console.log(user)
              user[0].stars--
              user[0].save();
             }
           }
       }
    
}
