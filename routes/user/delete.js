/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**                                                   
   **--------------------------------------------------** 
   **  Name : Question 1.4                             **                  
   **  Desc : Deleting a record on the basis mongoId   **
   **         of associated with that user             **   
   **                                                  **                   
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **           
   ******************************************************
   ******************************************************
*/
// Deleting the user record on the giving the mongoId of particular a user
// Importing dependies from package.json 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const{check, validationResult} = require('express-validator');

// Importing the User model for user collection
const User = require('../../models/User');

// Checking the condition and generating the errors message on given data with have from postman side
router.put('/',
        [ check('_id','Please enter a valid access token for delete a collection record')],
       async (req,res) =>
        {
           const errors = validationResult(req);
           if(!errors.isEmpty())
             {
               res.status(400).json({errors:errors.array()});
             }

    const { _id } = req.body;
    user = new User(
        {
          _id
        }
    );
// Errors handing with the help of try-catch block when their occurance on the basis conditions
   try
   {
     let user = await User.findOne({_id:req.body._id});
     if(!(user._id === req.body._id))
      {
         await User.deleteOne({_id:req.body._id});
         res.status(200).json(user._id+' This Access token Successfully Deleted from User Collections');
         console.log('User login by Access Token And varified');
      }
    else
     {
        console.log('There are no one user that are associated with this access token...');
        res.status(400).json('Invalid access token');
     }
   }
   catch(err)
     {
       console.error(err.message);
       res.status(400).send('Accessed Denied due to incorrect ACCESS TOKEN');
     }
});
module.exports = router;