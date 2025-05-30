import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";
//Place order COD :/api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        if (items.length === 0 || !address) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({ success: false, message: "Product not found" });
            }
            amount += product.offerPrice * item.quantity;
        }

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
        });

        res.json({ success: true, message: "Order placed successfully" });

    } catch (err) {
        console.error("Server error in placeOrderCOD:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
}


//Get all orders : /api/order/get
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate({ path: "items.product address", model: "Product"})
      .sort({ createdAt: -1 });
    
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
 
//Get all orders (for seller / admin): /api/order/seller

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentMethod: "COD" }, { isPaid: true }]
        })
        .populate([
            { path: "items.product", model: "Product" },
            { path: "address", model: "Address" }
        ])
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (err) {
        console.error("Error in getAllOrders:", err);
        res.json({ success: false, message: err.message });
    }
};

 