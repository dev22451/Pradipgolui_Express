// Defining & Creating Collection Schema for User Collection In Database
// Using mongoose liabraries
// Import mongoose modules in package.josn file from root dir.
const mongoose = require('mongoose');

// Defining User Schema 

// const UserSchema = new mongoose.Schema({
//     firstName:{
//         type: String,
//         require: true
//     },
//     lastName:{
//         type: String,
//         require: true
//     },
//     userName:{
//         type: String,
//         require: true
//     },
//     emailId:{
//         type: String,
//         require: true,
//         unique: true
//     },
//     password:{
//         type: String,
//         require: true
//     },
//     confrimPassword:{
//         type: String,
//         require: true
//     },
//     avatar:{
//         type: String
//     },
//     date:{
//         type: Date,
//         default: Date.now
//     }

});

module.exports = user = mongoose.model('user',UserSchema);
