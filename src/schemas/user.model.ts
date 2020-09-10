import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'

export const user = new mongoose.Schema({
    username:{
         type:String,
         required:true
        },

    email:{
        type:String,
        required:true
    },

    cards:[{
        rock:{type:Number},
        paper:{type:Number},
        scissor:{type:Number}
    }],

    stars:{type:Number},
    
    publickey:{type:String,
        required:true},

    lastupdated:{type:Date},

    client_id:{type:String},
    
    salt:{type:String},

    password:{type:String,
        required:true},


    
});



