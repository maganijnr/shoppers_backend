import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

//Generate user token
function generateToken(id, email, isAdmin) {
   return jwt.sign({
      id: id,
      email: email,
      isAdmin: isAdmin
   },  process.env.SECRET_KEY, {expiresIn: '3d'})
}

//Protect some restricted routes
async function protect(req, res, next) {
   let token 

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      try {
         token = req.headers.authorization.split(' ')[1]
         const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
         req.user = await User.findById(decodedToken.id).select("-password")
         next()
      } catch (error) {
         res.status(401).json({msg: 'Token not found'})
      }
   } 

   if(!token){
      return res.status(401).json({msg: 'Token not found'})
   }
}

//Protect admin routes
async function admin(req, res, next) {
   if(req.user && req.user.isAdmin){
      next()
   } else{
      res.status(401).json({msg:"Not authorized"})
   }
}

export {
   generateToken,
   protect,
   admin
}