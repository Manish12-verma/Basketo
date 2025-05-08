import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register User : /api/user/register
export const registerUser = async (req, res) => {
       try{
          const {name, email, password} = req.body;
            if(!name || !email || !password){
                return res.json({success:false,message:"Please fill all the fields"})
            }
            const existingUser = await User.findOne({email});

            if(existingUser){
                return res.json({success:false,message:"User already exists"})
            }   

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                name,
                email,
                password:hashedPassword
            }); 

            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'}); 

            res.cookie('token',token,{
                httpOnly:true,  //prevent js to access the cookie
                secure:process.env.NODE_ENV === 'production',  //use secure cookies in production 
                sameSite:process.env.NODE_ENV === 'production' ?"none":'strict',  //prevent CSRF attacks
                maxAge:7*24*60*60*1000  //7 days -> cookie expiration time
            })

            return res.status(201).json({success:true,message:"User registered successfully",user:{email:user.email,name:user.name}})

       }catch(err){
           console.log(err.message)
           res.status(500).json({success:false,message:err.message})
       }    
}
//Login User : /api/user/login

export const loginUser = async (req, res) => {
    try {
          const {email,password} = req.body;
          if(!email || !password){
            return res.json({success:false,message:"EMail and password are required"})
          }

          const user = await User.findOne({email});
          if(!user){
            return res.json({success:false,message:"Invalid email or password"})
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if(!isMatch){
            return res.json({success:false,message:"Invalid email or password"})
          }
          const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'}); 

          res.cookie('token',token,{
              httpOnly:true,  
              secure:process.env.NODE_ENV === 'production',  //use secure cookies in production 
              sameSite:process.env.NODE_ENV === 'production' ?"none":'strict',  //prevent CSRF attacks
              maxAge:7*24*60*60*1000  //7 days -> cookie expiration time
          })

          return res.status(200).json({success:true,message:"User registered successfully",user:{email:user.email,name:user.name}})
         
    } catch (err) {
        console.log(err.message)
        res.status(500).json({success:false,message:err.message})
    }
}

//check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try{
    const userId = req.userId; 
     const user = await User.findById(userId).select("-password");

     return res.status(200).json({success:true,user});
  }catch(err){
     console.log(err.message)
     res.status(500).json({success:false,message:err.message})
  }
}

//Logout User : /api/user/logout
export const logoutUser = async (req, res) => {
     try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.status(200).json({success:true,message:"User logged out successfully"})
     } catch (err) {
        console.log(err.message)
        res.status(500).json({success:false,message:err.message})
     }
 }