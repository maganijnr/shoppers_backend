import res from 'express/lib/response'
import Product from '../models/product.model.js'

//Get request
//Get all products
//access: PUBLIC
async function getProducts(req,res){
   try {
      const products = await Product.find().sort({createdAt: -1})
      res.json(products)
   } catch (error) {
      console.log(error.respnse.message)
   }
}

//POST request
//CREATE A PRODUCT products
//access: PRIVATE
async function createProduct(req,res){
   const {
      name,
      price,
      countInStock,
      rating,
      description,
      catgory,
      color,
      reviews,
   } = req.body

   const product = await new Product({
      name: name,
      price: price,
      countInStock: countInStock,
      rating: rating,
      description: description,
      catgory: catgory,
      color: color,
      reviews: reviews
   })

   try {
      const savedProduct = await product.save()
      res.json(savedProduct)
   } catch (error) {
      console.log(error.respnse.message)
   }
}

export {
   getProducts,
   createProduct
}