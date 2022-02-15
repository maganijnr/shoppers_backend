import Cart from '../models/cart.model.js'

//CREATE A CART
//POST REQUEST 
//ACCESS: Only logged in users can create a cart
async function createCart(req, res) {
   const cart = new Cart(req.body)
   try {
      const savedCart = await cart.save()
      res.status(200).json(savedCart)
   } catch (error) {
      res.status(400).json({msg:"Unable to create cart"})
   }
}

//GET CART ITEMS
//GET REQUEST
async function getCartItems(req, res) {
   try {
      const cartItems = await Cart.findOne({userId: req.user.id})
      res.status(200).json(cartItems)
   } catch (error) {
      res.status(404).json({msg:"User cart not found"})
   }
}

//GET CART ITEMS
//GET REQUEST
async function getAllCartItems(req, res) {
   try {
      const allCartItems = await Cart.find()
      res.status(200).json(allCartItems)
   } catch (error) {
      res.status(404).json({msg:"User cart not found"})
   }
}

//GET CART ITEMS
//GET REQUEST
async function getUserCartItems(req, res) {
   try {
      const cartItem = await Cart.findOne({userId: req.params.userId})
      res.status(200).json(cartItem)
   } catch (error) {
      res.status(404).json({msg:"User cart not found"})
   }
}

export {
   createCart,
   getCartItems,
   getAllCartItems,
   getUserCartItems
}