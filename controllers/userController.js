import User from '../models/user.model.js';

//GET ALL USERS
//GET request
//ACCESS: PRIVATE
async function getAllUsers(req,res){
   try {
      const users = await User.find()

      res.status(200).json(users)
   } catch (error) {
      res.status(400).json(error)
   }
}

//GET A USER
//GET request
//ACCESS: PRIVATE
async function getUser(req,res){
   const userId = req.params.id

   try {
      const user = await User.findOne({id: userId})
      res.status(200).json(user)
   } catch (error) {
      res.status(404).json({msg: 'User not found'})
   }
}

//Update a user
//PUT request
//ACCESS: PRIVATE
async function updateUser(req, res){
   if(req.params.id){
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
         $set: req.body
      }, {new: true})
      res.status(200).json(updatedUser)
   } else {
      res.status(404).json({msg: 'User not found'})
   }
}

//Delete a user
//DELETE request
//ACCESS: PRIVATE
async function deleteUser(req, res){
   if(req.params.id){
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({msg: 'User deleted successfully'})
   } else {
      res.status(404).json({msg: 'User not found'})
   }
}

//Get users stats
//GET request
//ACCESS: PRIVATE
async function getUsersStats(req, res) {
   const date = new Date()
   const lastYear = new Date(date.setFullYear( date.getFullYear() - 1))

   try {
      const data = await User.aggregate([
         {
            $match: {createdAt:{$gte: lastYear}}
         },
         { 
            $project: {month:{$month: "$createdAt"}}
         },
         { 
            $group: {_id:"$month", total:{$sum: 1}}
         }
      ])
   } catch (error) {
      res.status(400).json({msg:"Can't get user stats"})
   }
}

export {
   getAllUsers,
   getUser,
   updateUser,
   deleteUser,
   getUsersStats
}