import { Injectable } from '@nestjs/common';
import { playDto } from 'src/required/dto/play.dto';
import { Model } from 'mongoose';
import { user } from 'src/required/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { passkey } from 'src/required/interfaces/passkey.interface';

@Injectable()
export class PlayService {
     constructor(@InjectModel('user') private readonly user:Model<user>,
     @InjectModel('passkey') private readonly passkey:Model<passkey>,){}

    async play(gameid:string)
{
          var ans=0;
          const game=await this.passkey.find().where('gameid').equals(gameid).exec()
          const card1=game[0].card1
          const card2=game[0].card2
          console.log(gameid+" "+card1+"  "+card2)
          const user1=game[0].user1
          const user2=game[0].user2
           if(!card1.match(card2))
           {
             console.log(card1+" "+card2);
            
             (card1.match("ROCK"))?
              (ans=(card2.match("SCISSOR"))?1:0) : 
              ((card1.match("PAPER")) ? 
              (ans=(card2.match("ROCK"))?1:0) :
               ( (card1.match("SCISSOR"))?(ans=(card2.match("PAPER"))?1:0):ans=-1))
             
             console.log(ans);
             
             if(ans==1){
              const user= await this.user.find().where('username').equals(user2).exec();

              game[0].playerWin.push(game[0].user1)
              console.log(user)
              user[0].stars--
              user[0].save();
              game[0].card1="empty"
              game[0].card2="empty"
              game[0].save()
              return game[0].user1
             }
             else if(ans==0){
              const user= await this.user.find().where('username').equals(user1).exec();
              game[0].playerWin.push(game[0].user2)
              console.log(user)
              user[0].stars--
              user[0].save();
              game[0].card1="empty"
              game[0].card2="empty"
              game[0].save()
              return game[0].user2
             }
             game[0].playerWin.push("tie")
             game[0].card1="empty"
             game[0].card2="empty"
             game[0].save()
             return "game is draw"
           }
           else{
            game[0].playerWin.push("tie")
            game[0].card1="empty"
            game[0].card2="empty"
            game[0].save()
            return "game is draw"
           }
       }
    
}
