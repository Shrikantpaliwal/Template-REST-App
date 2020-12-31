const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connect To DB
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.CONNECTMONGO, { useNewUrlParser: true , useUnifiedTopology: true }, ()=>{console.log('Connected to DB')});

//Middleware
app.use(express.json());



//Auth Router
const authRoute = require('./routes/auth');
//Routes Middleware
app.use('/api/user', authRoute);




app.listen(3000, ()=>{console.log("Server Up And Running")});

