import bcrypt from 'bcryptjs'

import User from "../models/userModel.js"
import generateToken from '../lib/generateToken.js'
import cloudinary from '../lib/cloudinary.js'



export const Signup = async(req,res)=>{
    try {
        const {fullName,email,password} = req.body

        if(!fullName || !email || !password){
            return res.status(400).json({message : "All feilds are required"})
        }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message : "Email already exists"})
        
        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 char"})
        }

        const salt = await bcrypt.genSalt(10)

        const hasedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password : hasedPassword
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            return res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
        }else{
            return res.status(400).json({message : "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in Signup Controller : ",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message : "Email Is Not Found"})
        }

        const ispasswordCorrect = await bcrypt.compare(password,user.password)
        if(!ispasswordCorrect){
            return res.status(400).json({message : "Incorrect Password"})
        }

        generateToken(user._id,res)
        
        return res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic
        })
        
    } catch (error) {
        console.log("Error in Login Controller : ",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const Logout = async(req,res)=>{
    try {
        res.cookie('jwt',"",{maxAge : 0})

        return res.status(200).json({message : "Logout Successfull"})
    } catch (error) {
        console.log("Error in Logout Controller : ",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}



export const UpdateProfile = async(req,res)=>{
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic) return res.status(400).json({message : "ProfilePic is Required"})
        
            const uploadedResponse = await cloudinary.uploader.upload(profilePic)

            const updatedUser = await User.findByIdAndUpdate(userId,{profilePic : uploadedResponse.secure_url},{new : true})

            res.status(200).json(updatedUser)

    } catch (error) {
        console.log("Error in UpdateProfile Controller : ",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const checkAuth = async(req,res)=>{
    try {
        const user = req.user
        if(!user) return res.status(404).json({message : "User Not Found"})
        return res.status(200).json(user)
        
    } catch (error) {
        console.log("Error in checkAuth Controller : ",error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}