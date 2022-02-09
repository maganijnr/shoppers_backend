import CryptoJS from 'crypto-js'
import User from '../models/user.model.js'
import { registerValidation, loginValidation } from '../utils/authValidation.js'
import {generateToken} from '../utils/token.js'

//POST route
//REGISTER USER
//access: PUBLIC
async function registerUser(req, res){
   const {name, email, password} = req.body

   const {errors, valid} = registerValidation(name, email, password)
   if(!valid) return res.json(errors);

   const userExist = await User.findOne({email: email})

   if(userExist){
      res.status(400).json({msg:"User already exist"})
   }

   const user = await User.create({name:name, email: email, password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()})

   if(user){
      //Send token also
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id, user.email,user.isAdmin)
      })
   } else {
      res.status(400).json({msg:"User not found"})
   }

}

//POST route
//LOGIN USER
//access: PUBLIC
async function loginUser(req, res){
   const {email, password} = req.body

   const {errors, valid} = loginValidation(email, password)
   if(!valid) return res.status(402).json(errors);

   const user = await User.findOne({email})
   if(!user){
      return res.status(402).json({message:"User does not exist"})
   }

   const hashedPassword = CryptoJS.AES.decrypt(user.password,  process.env.SECRET_KEY);
   const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)


   if(originalPassword !== password) return res.status(400).json({msg:"Invalid Password"})

   res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.email,user.isAdmin)
   })
}

export {
   registerUser,
   loginUser
}