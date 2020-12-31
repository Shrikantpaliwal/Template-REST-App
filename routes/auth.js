const router = require('express').Router();
const User = require('../model/User');

const VReq = require('joi');

const ValRule = VReq.object({
    name: VReq.string().min(6).max(255).required(),
    email: VReq.string().min(6).max(255).required().email(),
    password: VReq.string().min(6).max(255).required()
});

router.post('/register', async (req, res) =>{
    const {error} = ValRule.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    console.log(req.body);
    const user = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
     });
    
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.send(err);
    }
});



module.exports = router;