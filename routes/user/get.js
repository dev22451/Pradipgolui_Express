/* ******************************************************
   ******************************************************
   **                                                  **
   **--------------------------------------------------**                                                   
   **--------------------------------------------------** 
   **  Name : Question 1.3                             **                  
   **  Desc : Checking user exist or not on the basis  **
   **         Email || user mongoId address, after     **
   **         varified user return user data of the    **
   **         associated email of that User            **                   
   **                                                  **
   **--------------------------------------------------**
   **--------------------------------------------------**
   **                                                  **           
   ******************************************************
   ******************************************************
*/
// Accessing the user data by passing mongoId of user of particular user associated with _id
// Importing dependies from package.json 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const{check, validationResult} = require('express-validator');

//Importing the User model for user collection 
const User = require('../../models/User');

// For: response/request for login route in ./route/api/access-token || validating the mongoId of user .
router.get('/',
        [ check('_id','Please enter a valid access token for login in home page')],
       async (req, res) =>
       {
           const errors = validationResult(req);
           if(!errors.isEmpty())
               res.status(400).json({errors:errors.array()});
               
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
         res.status(200).json('User details|| ObjectId :' +user._id+ ' First Name: '+user.firstName+' Last Name: '+user.lastName+' Username: '+user.userName+ ' Email: '+user.email+' password: '+user.password+ ' Confrim Password: '+user.confrimPassword);
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
