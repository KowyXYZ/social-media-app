import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async() => {
    mongoose.set('strictQuery', true); //set settings to true to avoid console log

    if(isConnected) {
        console.log('MongoDB is already connected!')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'social_media',
            useNewUrlParser: true,
            useUnifiedToplogy: true
        })

        isConnected = true
        console.log('MongoDB Connected')
    } catch (error) {
        console.log(error)
    }
}