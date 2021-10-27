/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**                                                   
   **--------------------------------------------------** 
   **  Name : Question 1.1                             **                  
   **  Desc : Creating user model and storing data     **
   **         in User collection                       **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **           
   ******************************************************
   ******************************************************
*/

// Importing dependencies from package.json file
const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Importing User model for user collection
const User = require('../../models/User');

// Conditions checking and errors message generate for false conditions
router.post('/',
[
    check('firstName','Pleae enter the first name').not().isEmpty(),
    check('email','Please enter a valid email address').isEmail(),
    check('lastName','Pleae enter the last name').not().isEmpty(),
    check('userName','Pleae enter the correct User name ').not().isEmpty(),
    check('password','Please enter a valid password with 6 or more than 6 characters').isLength({min:6}),
    check('confrimPassword','Pleae enter the first name').not().isEmpty(),
],

// Validation check if here any errors are find
async (req,res) =>
       {
         const errors = validationResult(req);
         if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
       }

    // Collecting the data from Postman in json format with following field key-values pair on the basis User model as require 
    const{firstName,email,lastName,userName,password,confrimPassword} = req.body; 

    //Checking user exist or not by using existing usernames in the database
    try
    { 
        let user = await User.findOne({email});
     // If user exist show status
        if(user)
            res.status(400).json({errors:[{msg:'User Already exist'}] });

        // Create user type of object to storing users collection in the database
        user = new User(
            {
              firstName,
              email,
              lastName,
              userName,
              password,
            });

    // Encrypting the password by using genSalt
     const salt = await bcrypt.genSalt(10);

     // Encrypting the password using hashing using genSalt
     user.password = await bcrypt.hash(password,salt);

     // Checking password or confrimPassword are same
     if(password === req.body.confrimPassword)
      {
         await user.save();     
         res.send('User has been registered');
      }
    }
    catch(err)
      {
         console.error(err.message);
         res.status(500).send('Server error');
      }
    
    // show in the console data from postman of json format
      console.log(req.body);
    });    
module.exports = router;