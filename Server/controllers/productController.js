import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product.js';

//Add a product : api/product/add
export const addProduct = async(req,res)=>{
try {
     let productData  = JSON.parse(req.body.productData);
     
     const images = req.files;

     let imageUrl = await Promise.all(images.map (async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {resource_type:"image"
        });
        await Product.create({
            ...productData,
            image:imageUrl,
        })

        res.json({
            success:true,
            message:"Product added successfully",
        })
     }))
} catch (err) {
     console.log(err);
     res.status(500).json({
        success:false,
        message:err.message,
     })
}
}

//Get a product : api/product/list
export const productList = async(req,res)=>{

}

//Get single product : api/product/id
export const productById = async(req,res)=>{

}
//Change Product inStock : api/product/stock
export const changeStock = async(req,res)=>{

}