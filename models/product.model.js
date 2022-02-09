import mongoose from 'mongoose';


const ReviewSchema = mongoose.Schema({
   name: {type: String, required: true},
   rating:{type: Number, required: true},
   review: {type: String, required: true}
})

const ProductSchema = mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
      ref:"User"
   },
   name:{
      type: String, 
      required: true
   },
   price:{
      type: Number, 
      required: true
   },
   countInStock:{
      type: Number, 
      required: true
   },
   rating:{
      type: Number, 
      required: true, 
      default: 0
   },
   reviews:[ReviewSchema],
   numReviews:{
      type: Number, 
      required: true, 
      default: 0
   },
   description:{
      type: String, 
      required: true
   },
   category:{
      type: String, 
      required: true
   },
   color:{
      type: String, 
      required: true
   }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product