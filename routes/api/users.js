// Importing dependencies from package.json For Modules ||
// Rounting  express.router()
// Bcrypt for password encryption bcryptjs 
// Gravatar for profile checking with associated email address for particular userId
// config for MongoDB database connections to MongoDB Atlas Cloud Database Platform
// express-validator for password, email, etc validating

const express = require('express');
// const router = express.router();
const gravatar = require ('gravator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require ('config');
const normalize = require('normalize-url');
const {check,validationResult} = require('express-validator');

// Defining or set to user document in datbase 
const User = require('../../models/User');

// Creating Post request / response
// Validating the data 
router.post(
    '/',
    check('firstName','First Name is required').notEmpty(),
    check('lasttName','Last Name is required').notEmpty(),
    check('userName','Uesr Name is required').notEmpty(),
    check('emailId','Please Provide valide email address').isEmail(),
    check('password','Password must be 6 or more than characters').isLength({min:6}),
    check('confrimPassword','Password must be 6 or more than characters').isLength({min:6}),

    // Throw errors message
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
    
    const{name, email, password } = req.body;

    try{
        let user = await User.findOne({email});

        if(user){
            return res
            .status(400)
            .json({errors:[{ msg: 'User Already Exist'}] });
        }

        const avatar = normalize(
            gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        }),
        {forceHttps:true}
        )

        user = new User({
            firstName,
            lastName,
            userName,
            email,
            password,
            confrimPassword,
            avatar
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();
        const payload = {
            user:{
                id:user.id
            }
        };
        
        //res.send('User Registered and User Collection In Database');
    }
    catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');   
    }

} 

);

module.exports = router;