const mongoose=require('mongoose');

const connectDB=async ()=>{
    // password: fAYG6s4bsVCUwRVV
    // username: bhuvaneshw522
    try {        
        await mongoose.connect('mongodb+srv://bhuvaneshw522:fAYG6s4bsVCUwRVV@happycluster0.pmab3.mongodb.net/?retryWrites=true&w=majority&appName=Happycluster0');
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('MongoDB connection Error:',error);
        process.exit(1);
    }
};

module.exports=connectDB;