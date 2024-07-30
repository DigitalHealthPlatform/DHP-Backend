import mongoose from "mongoose";
import 'dotenv/config'



const connectionString = process.env.Mongo_Url

export const dbconnection = async()=>{
    try {
        await mongoose.connect(connectionString)
        console.log('Database is connected successfully')
    } catch (error) {
        console.log(error)
    }

};