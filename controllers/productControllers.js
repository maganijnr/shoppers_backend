import Product from '../models/product.model.js'

//Get request
//Get all products
//access: PUBLIC
async function getProducts(req,res){
   const qNew = req.query.new 
   const qCatgeory = req.query.catgeory

   try {
      let products;

      if(qNew){
         products = await Product.find().sort({createdAt: -1})
      } else if(qCatgeory){
         products = await Product.find({categories: {
            $in: [qCatgeory]
         }}).sort({createdAt: -1})
      } else {
         products = await Product.find()
      }

      res.status(201).json(products)
   } catch (error) {
      console.log(error)
   }
}

//Get request
//Get a single product
//access: PUBLIC
async function getProduct(req,res){
   const productId = req.params.id

   try {
      const product = await Product.findOne({id: productId})

      res.status(200).json(product)
   } catch (error) {
      res.status(404).json({msg:"Product not found"})
   }
}

//POST request
//CREATE A PRODUCT products
//access: PRIVATE
async function createProduct(req,res){
   const product = await new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      size: req.body.size,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      description: req.body.description,
      categories: req.body.categories,
      color: req.body.color,
      reviews: req.body.reviews
   })

   try {
      const savedProduct = await product.save()
      res.status(201).json(savedProduct)
   } catch (error) {
      console.log(error)
   }
}

//DELETE request
//DELETE A PRODUCT 
//access: PRIVATE
async function deleteProduct(req,res){
   if(req.params.id){
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: 'Product deleted successfully'})
   } else {
      res.status(404).json({msg: 'Product not found'})
   }
}

//Update request
//Upadate a product
//access: PRIVATE
async function updateProduct(req, res){
   if(req.params.id){
      const product = await Product.findByIdAndUpdate(req.params.id, {
         $set: req.body,

      },{new: true});

      res.status(200).json(product)
   } else{
      res.status(404).json({msg: 'Product not found'})
   }
}

export {
   getProducts,
   getProduct,
   createProduct,
   deleteProduct,
   updateProduct
}