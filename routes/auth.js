const router = require('express').Router();
const User = require('../model/User');
const {RegisterValidation, LoginValidation} = require('../validation/Validation');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) =>{
    // //Validation
    // const {error} = RegisterValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    //User Already Exists
    const EmailExists = await User.findOne({email : req.body.email});
    if(EmailExists) return res.status(400).send({"error": "true","Message": "User Already Exists"});

    //Salting Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Add to the DataBase
    const user = User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
     });
    
    try{
        const savedUser = await user.save();
        res.send(savedUser); // To-Do: Dont send complete User
    }
    catch(err){
        res.send(err);
    }
});

router.post('/login', async (req, res)=>{
    //Validation
    const {error} = LoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //User Exists
    const UserExists = await User.findOne({email : req.body.email});
    if(!UserExists) return res.status(400).send({"error": "true","Message": "Issue with Email or Password"});

    //Check Password
    const ValidPass = await bcrypt.compare(req.body.password, UserExists.password);
    if(!ValidPass) return res.status(400).send({"error": "true","Message": "Wrong Password"});

    return res.send({"error": "false","Message": "Login Success"});   
});



module.exports = router;