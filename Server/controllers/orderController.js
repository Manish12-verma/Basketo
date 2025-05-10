import Product from "../models/Product";
import Order from "../models/Order";
//Place order COD :/api/order/cod

export const placeOrderCOD = async (req, res) => {
      try{
           const {userId,items,address} = req.body;

           if(items.length === 0 || !address){
                return res.status(400).json({success:false,message:"Please fill all the fields"})
           }

           let amount  = await items.reduce(async (acc,item)=>{
                const product  = await Product.findById(item.product);
                if(!product){
                     return res.status(400).json({success:false,message:"Product not found"})
                }
                return(await acc) + product.fferPrice * item.quantity;
           },0)

           amount += Math.floor(amount*0.02);

           await Order.create({
                userId,
                items,
                 amount,
                address,
                paymentMethod:"COD",
           });

           res.json({success:true,message:"Order placed successfully"})
      }catch(err){
            res.status(500).json({success:false,message:err.message})
      }
}


//Get all orders : /api/order/get

export const getUserOrders = async (req, res) => {
       try {
            const {userId} = req.body;
            const orders = await Order.find({
                userId,
                $or:[{paymentType:"COD"},{isPaid:true}]
            }).populate("items.product address").sort({createdAt:-1});

            res.json({success:true,orders})
       }catch (err) {
            res.json({success:false,message:err.message})
       }
}


//Get all orders (for seller / admin): /api/order/seller

export const getAllOrders = async (req, res) => {
       try {
     
            const orders = await Order.find({
                $or:[{paymentType:"COD"},{isPaid:true}]
            }).populate("items.product address").sort({createdAt:-1});

            res.json({success:true,orders})
       }catch (err) {
            res.json({success:false,message:err.message})
       }
}

 