import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const {sellerToken} = req.cookies;


    if(!sellerToken) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

     try{
          const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
          if(decoded.email === process.env.SELLER_EMAIL){
            next(); // Call the next middleware or route handler
          }else{
            return res.status(401).json({success:false,message:"Unauthorized"})
          }
 
        }catch(err){ 
            return res.status(500).json({success:false,message:err.message})
        }
}


export default authSeller;
