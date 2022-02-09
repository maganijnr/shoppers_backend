import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
   orderItems:[
      { 
         name:{ type: String, required: true},
         qty: {type:Number, required: true},
         image: {type: String, required: true},
         price: {type: Number, required: true},
         product: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Product'}
      }
   ],
   shippingAddress:{
      address: {type: String, required: true},
      city: {type: String, required: true},
      postalCode: {type: String, required: true},
      country: {type: String, required: true},
   },
   paymentMethod:{type: String, required: true},
   paymenTResult:{
      id: {type: String},
      status: {type: String},
      update_time: {type: String},
      email_address: {type: String}
   },
   deliveryPrice: {
      type: Number,
      required: true,
      default:0.0
   },
   totalPrice: {
      type: Number,
      required: true,
      default:0.0
   },
   isPaid: {
      type: Boolean,
      required: true,
      default:false
   },
})

const Order = mongoose.model('Order', OrderSchema)

export default Order