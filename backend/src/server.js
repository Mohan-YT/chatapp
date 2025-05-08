import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/authRouter.js'
import messageRouter from './routes/messageRouter.js'
import connectDB from './lib/db.js'
import {app,server} from './lib/socket.js'

import path from 'path'

dotenv.config()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve() //deploye code

app.use(express.json({limit : "5mb"}))
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))


app.use("/api/auth",authRouter)
app.use("/api/messages",messageRouter)

//deploye code
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/*splat",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})