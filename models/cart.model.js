import mongoose from 'mongoose'

const ItemSchema = mongoose.Schema({
   productId: {type:mongoose.Schema.Types.ObjectId, ref:"Product"},
   price:{type:Number, required: true},
   qty: {type:Number, default:1, required: true},
   totalPrice: {type:Number, required: true}
})

const CartSchema = mongoose.Schema({
   userId: {type: String, required: true},
   products: [ItemSchema],
   subTotalPrice: {type: Number, required: true, default: 0}
})

const Cart = mongoose.model('Cart',CartSchema)

export default Cart