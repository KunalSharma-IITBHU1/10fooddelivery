import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://newproject:kunalsharma@cluster0.2ylmaqc.mongodb.net/food-del').then(()=>
    console.log('database connected'))
}