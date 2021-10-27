/***************************************************************************
 ***************************************************************************
 **                                                                       **
 **                     Question 1.5                                      **
 **       Returning the 10 User From the User Collection From Database    **
 **                                                                       **
 ***************************************************************************
 ***************************************************************************
*/
//Returning the 10 user to a request
// Importing dependies from package.json 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const{check, validationResult} = require('express-validator');

const User = require('../../models/User');

// There is some issue || still working on it
router.get('/',
           [
               check('pageNo','please enter the page no. that you to jump on that page.')
           ],

           async (req,res) =>
            {
              const errors = validationResult(req);
               if(!errors.isEmpty())
                {
                  res.status(400).json({errors:errors.array()});
                }

            const { pageNo }= req.body;

            // try
            // {
            //     let user = await User.find();
            //     if(user && req.body.pageNo===1)
            //      {
            //         let i;
            //         for(i=0;i<10;i++)
            //          {
            //             res.status(200).json(' This Access token Successfully Deleted from User Collections');
            //              //console.log('firsName: '+user.firstName[i]);
            //          } 

            //      }
            // } 
            catch(err)
               {
                res.status(400).json('Please enter the correct page number');
                console.log('Wrong page number'); 
              }
       
        });

module.exports = router;            
               
