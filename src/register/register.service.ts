import { Injectable, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/interfaces/user.interface';
import { username } from 'src/dto/username.dto';
import { NotificationService } from 'src/notification/notification.service';
import { passkey } from 'src/interfaces/passkey.interface';

@Injectable()
export class RegisterService
 {

constructor(
  @InjectModel('user')  private readonly user:Model<user>,
  @InjectModel('passkey') private readonly passkey:Model<passkey>,
  private readonly notificationService:NotificationService){}




async reset(key:string,newPass:string,name:string)
{
  const legitkey=await this.passkey.findOne().where('name').equals(name).select('key');
  if(legitkey.key==key){
    const user= await this.user.findOne().where('username').equals(name).exec();
    user.password=newPass
    user.save()
    console.log("password updated successfully")
    return "password updated successfully"
  }
  else
  {
    console.log("key not matched")
    return "key not match"
  }
}

async resetPass(name:string)
{
 
  let existence = await this.user.collection.findOne({ username: name})

  if(existence){
      const matchkey=(Math.floor((Math.random() * 10000) + 54))
      const pass = new this.passkey({
        name:name,
        key:matchkey
      })
      pass.save()
      this.notificationService.sendEmail(name,matchkey)
    }
  else
  {
    console.log(`User with ${name} not exist`)
  }

}




async createUser(userNameDto:username)
        
{
           const user=new this.user
           ({
             username:userNameDto.username,
             email:userNameDto.email,
             cards:[{
              rock:3,
              paper:3,
              scissor:3
                   }],
             stars:10,
             publickey:userNameDto.publickey,
             lastupdated:new Date(),
             password:userNameDto.password
           })
           
           try 
           {
            let curruser = await this.user.collection.findOne({ username: userNameDto.username})
            console.log(curruser)
            if (curruser)
             {
              const arr=[]
              console.log("exists");
              var i=0
              while(i<3)
              {
              const user1 = userNameDto.username+Math.floor((Math.random() * 100) + 54)
              const userfind=await user.collection.findOne({ username: user1})
              
              if(userfind)
              {}
              else
              {
               arr.push(user1)
               i++
              }
              }
              return "user exists you can try from these three " + (arr)
             } 
            else
            {
              await user.save()
              console.log(user)
              return "created"
            }
          } 
          catch (err) 
          {
            console.error(err)
          }
        }
        
}
