import express from 'express';
import {
   getAllUsers,
   updateUser,
   deleteUser,
   getUsersStats,
   getUser
} from '../controllers/userController.js'
import {protect, admin} from '../utils/token.js'

const router = express.Router();

router.route('/')
   .get(protect, admin, getAllUsers);

router.route('/:id')
   .put(protect, admin, updateUser)
   .get(protect, admin, getUser)
   .delete(protect, admin, deleteUser);

router.route('/userstats')
   .get(protect, admin, getUsersStats);

export default router


