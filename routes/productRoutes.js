import express from 'express';
import { getProducts, createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productControllers.js'
import {admin, protect} from '../utils/token.js'

const router = express.Router();

router.route('/')
   .get(getProducts)
   .post(protect, admin, createProduct)
   
router.route('/:id')
   .get(getProduct)
   .delete(protect, admin, deleteProduct)
   .put(protect, admin, updateProduct)

export default router