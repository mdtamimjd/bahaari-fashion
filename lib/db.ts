import mongoose from "mongoose"

export default async function dbConnect() {
    try {
        const url = process.env.MONGODB_URL as string;
        if(!url) return console.log("DB URL NOT FOUND!");
        if(mongoose.connection.readyState >= 1)return;
        await mongoose.connect(url)
        console.log("DB Connected!")
    } catch (error:any) {
        console.log(`DB Error: ${error.message}`)
    }
}