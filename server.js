/* *******************************************
   *******************************************
   **  Name : FIRST QUESTION IN MERNSTACK   **                  
   **  From : HangingPanda Private Limited  **
   **  DEV  : Pradip Golui                  **
   **  Date : 21-10-2021                    **
   *******************************************
   *******************************************
*/

// Basic server configuration for Node Server using express library
const express = require('express');
const connectDB = require('./config/db');
const app = express();

// MongoDB Connected Method Here
connectDB();

//
app.use(express.json());

// @GET request/response form client side
// app.get('/user/register',(req,res) => res.send('Hello World! Node server is running at localhost in Port: 5577'));
app.get('/user/register',(req,res) => res.send('My First API Is Running.......'));

// Using user.js from routes/api in root folder
app.use('./api/users',require('./routes/api/users'));


// Port create for localhost 
const PORT = process.env.PORT || 5577;

// Here port is listening from localhost
app.listen(PORT,()=>console.log(`Server Started at localhost at port ${PORT}`));
