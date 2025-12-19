import User from "../models/User.js";

export const updateCart = async (req,res) => {
    try{
     const {userId,cartItems} = req.body;
     await User.findByIdAndUpdate(userId, {cartItems})
     res.json({success:true, message: "Cart Updated"})
    }catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message})
   }
}

export const removeFromCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await User.findByIdAndUpdate(userId,{ $unset: { [`cartItems.${productId}`]: true } });

    return res.json({ success: true, message: "Removed from Cart Item" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

