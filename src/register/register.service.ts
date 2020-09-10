import { Injectable, Get, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/required/interfaces/user.interface';
import { username } from 'src/required/dto/username.dto';
import { NotificationService } from 'src/notification/notification.service';
import { passkey } from 'src/required/interfaces/passkey.interface';
import * as bcrypt from 'bcrypt'

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
  if(legitkey.key==key)
  {
    const user= await this.user.findOne().where('username').equals(name).exec();
    user.password=newPass
    user.save()
    console.log("password updated successfully")
    this.passkey.deleteMany({name:name}, function (err) {
      
      if(err) console.log(err);
      console.log("Successful deleted from db also");})
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
  this.passkey.deleteMany({name:name}, function (err) 
  {
    if(err) console.log(err);
    console.log("Successful deletion");
  })
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

    private async hashPassword(password:string,salt:string):Promise<string>{
        return bcrypt.hash(password,salt);
    }

    


    async createUser(userNameDto:username)
       {
           const user=new this.user()
           
             user.username=userNameDto.username,
             user.email=userNameDto.email,
             user.cards=[{ rock:3,paper:3,scissor:3}],
             user.stars=10,
             user.publickey=userNameDto.publickey,
             user.lastupdated=new Date(),
             user.client_id="0",
             user.salt=await bcrypt.genSalt(),
             user.password=await this.hashPassword(userNameDto.password,user.salt)
           
           
          try 
         {
            let curruser = await this.user.collection.findOne({ username: userNameDto.username}) || 
                           await this.user.collection.findOne({ email: userNameDto.email}) ||
                           await this.user.collection.findOne({ publickey: userNameDto.publickey})
            console.log(curruser)
            if (curruser)
             {
                const arr=[]
                console.log("user with provided credentials already exist ");
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
               if(await this.user.collection.findOne({ username: userNameDto.username}))
               return "user exists with provided name you can try from these three " + (arr)
               else
               return "please check your public key and email as a user with one or both of these present already"
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
