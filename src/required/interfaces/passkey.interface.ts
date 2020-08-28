import * as mongoose from 'mongoose'

export interface passkey extends mongoose.Document{
    name:string
    key:string
}