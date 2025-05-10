import User from "../models/User.js";

//update user cartData : /api/cart/update

export const updateCart = async (req, res) => {
     try {
          const {userId,cartItems} = req.body;
          const user = await User.findByIdAndUpdate(userId,{cartItems});
            if (!user) {
                 return res.status(404).json({ success: false, message: "User not found" });
            }
            res.json({ success: true, message: "Cart updated successfully" });

     } catch (err) {
           cpnsole.log(err.message);
           res.status(500).json({ success: false, message: err.message });
     }
}