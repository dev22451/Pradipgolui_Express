// Connecting to MongoDB database using mongoose libraries
// Basic mongoose connecting string to connect a database


// Importing dependencies from package.json file in root folder 
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//  Make connection established using Async libraries

const connectDB = async () => {
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDB Connected.......');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports =connectDB;