import Order from '../models/order.model.js'

//CREATE AN ORDER
//POST request
//access: private -- logged in users can create an order
async function createOrder(req,res){
   const order = new Order(req.body)

   try{
      const savedOrder = await order.save()

      res.status(201).json(savedOrder)
   }catch(err){
      res.status(404).json({msg:"Cannot process order"})
   }
}

//UPDATE AN ORDER
//PUT request
//access: private -- logged in users can UPDATE  an order
async function updateOrder(req,res){
   if(req.params.id){

      try {
         const updateOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set: req.body
         }, {new: true})

         res.status(201).jsom(updateOrder)
      } catch (error) {
         res.staus(400).json({msg:"Can't update order"})
      }
   }
}

export {
   createOrder,
   updateOrder
}