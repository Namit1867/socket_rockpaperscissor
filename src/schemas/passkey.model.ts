import * as mongoose from "mongoose";

export const passKey = new mongoose.Schema({
      name:{type:String,required:true},
      key:{type:String,required:true}
})