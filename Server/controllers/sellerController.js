//Login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
         try {
            const {email,password} = req.body;

        if(password !== process.env.SELLER_PASSWORD || email !== process.env.SELLER_EMAIL){
            return res.status(401).json({success:false,message:"Invalid email or password"})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:'7d'});
        res.cookie('sellerToken',token,{
            httpOnly:true,  
            secure:process.env.NODE_ENV === 'production',  //use secure cookies in production 
            sameSite:process.env.NODE_ENV === 'production' ?"none":'strict',  //prevent CSRF attacks
            maxAge:7*24*60*60*1000  //7 days -> cookie expiration time
        })
            return res.status(200).json({success:true,message:"Seller logged in successfully",user:{email}})
         } catch (err) {
            console.log(err.message)
            res.status(500).json({success:false,message:err.message})
         }
}

//Seller Auth : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try{
     return res.status(200).json({success:true});
  }catch(err){
     console.log(err.message)
     res.status(500).json({success:false,message:err.message})
  }
}

//Logout Seller : /api/seller/logout
export const logoutSeller = async (req, res) => {
    try {
       res.clearCookie('sellerToken', {
           httpOnly: true,
           secure: process.env.NODE_ENV === 'production',
           sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
       });
       return res.status(200).json({success:true,message:"Seller logged out successfully"})
    } catch (err) {
       console.log(err.message)
       res.status(500).json({success:false,message:err.message})
    }
}