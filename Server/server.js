import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js'; // Import the user router
import sellerRouter from './routes/sellerRoute.js'; // Import the seller router
import connectCloudinary from './configs/cloudinary.js'; // Import the Cloudinary connection
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();
await connectCloudinary(); // Connect to Cloudinary

const allowedOrigins = [
    'http://localhost:5173'
]

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


app.get('/', (req, res) => {res.send('Hello World!')});
app.use('/api/user', userRouter); // Register the user router
app.use('/api/seller', sellerRouter); // Register the seller router
app.use('/api/product', productRouter); 
app.use('/api/cart', cartRouter);  
app.use('/api/address', addressRouter); // Register the address router
app.use('/api/order', orderRouter); // Register the order router

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})