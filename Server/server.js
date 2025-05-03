import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();


const allowedOrigins = [
    'http://localhost:5173'
]

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})