import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const {token}  = req.cookies;

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized"})
    }

    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded.id){
        req.userId = decoded.id; // Attach userId to the request body 
      }else{
        return res.status(401).json({success:false,message:"Unauthorized"})
      }

      next(); // Call the next middleware or route handler
    }catch(err){
       
        return res.status(500).json({success:false,message:err.message})
    }
}

export default authUser;