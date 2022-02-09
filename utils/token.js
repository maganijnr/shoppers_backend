import jwt from 'jsonwebtoken';

function generateToken(id, email, isAdmin) {
   return jwt.sign({
      id: id,
      email: email,
      isAdmin: isAdmin
   },  process.env.SECRET_KEY, {expiresIn: '3d'})
}

async function verifyToken(req, res, next) {
   const authHeader = req.headers.authorization

   if(authHeader){
      const token = authHeader.split("")[1]

      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
         if(err) return res.status(403).json({msg:"Token not valid"})

         res.user = user

         next()
      })
   }
}

async function verifyAdmin(req, res, next) {
   verifyToken(req, res, ()=>{
      if(req.user.id === req.params.id || req.user.isAdmin){
         next()
      } else {
         res.status(403).json({msg:"You are not authorized"})
      }
   })
}

export {
   generateToken,
   verifyToken,
   verifyAdmin
}