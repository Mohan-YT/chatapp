
import cloudinary from "../lib/cloudinary.js"
import { io, getReceiverSocketId } from "../lib/socket.js"
import Message from "../models/messageModel.js"
import User from "../models/userModel.js"

export const getUsersForSideBar = async(req,res)=>{
    try {
        const currentUserId = req.user._id
        if(!currentUserId) return res.status(404).json({message : "User ID Not Found"})

        const filterUsers = await User.find({_id : {$ne : currentUserId}}).select("-password")
        if(!filterUsers) return res.status(404).json({message : "User Not Found"})

        return res.status(200).json(filterUsers)

    } catch (error) {
        console.log("Error in getUsersForSideBar controller",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const getMessages = async(req,res)=>{
    try {
        const {id : userToChatId} = req.params
        const myId = req.user._id  

        const messages = await Message.find({
            $or : [
                {senderId : myId, receiverId : userToChatId},
                {senderId : userToChatId, receiverId : myId}
            ]
        })

        return res.status(200).json(messages)


    } catch (error) {
        console.log("Error in getMessages controller",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const sendMessage = async(req,res)=>{
    try {
        const {text,image} = req.body
        // const {id : senderId} = req.params
        // const receiverId = req.user._id
        const senderId = req.user._id;
        const { id: receiverId } = req.params;

        let imageUrl;

        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadedResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl
        })

        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        return res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

