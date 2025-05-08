import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB Connect : ${conn.connection.host}`)
    } catch (error) {
        console.log("MongoDB Error : ",error)
    }
}

export default connectDB