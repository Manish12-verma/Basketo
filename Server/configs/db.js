import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        mongoose.connection.on('connected',()=>{
                console.log('MongoDB connected')
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/basketo`);
    }catch(err){  
        console.log('MongoDB connection error:', err.message)
    }
}

export default connectDB;
