import express from 'express';
import {createCart, getCartItems, getAllCartItems,getUserCartItems} from '../controllers/cartController.js'
import {protect, admin} from '../utils/token.js'

const router = express.Router();

router.route('/')
   .post(protect, createCart)
   .get(protect, admin, getAllCartItems)

router.route('/:userId')
   .get(protect, getCartItems)
   .get(protect, admin, getUserCartItems)

export default router