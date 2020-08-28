import * as mongoose from 'mongoose';


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
    
    password:{type:String,
        required:true}
});



