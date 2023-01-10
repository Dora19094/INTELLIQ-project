const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//setup express app
const app = express();

//connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/intelliQ')
    .then(result=>{
        console.log('Connected to DB');
        app.listen(3000,()=>{
            console.log('Start listening on port 3000');
        });
    })
    .catch(err=>console.log(err))
mongoose.Promise = global.Promise;

//middleware for accesing data in json
app.use(bodyParser.json());

//admin endpoints
app.use('/admin',require('./routes/admin.js'));

//intelliQ routes
app.use(require('./routes/intelliQ.js'));

//error handling
app.all('*',(req,res,next)=>{
    try{
        throw new Error('Wrong URI or Wrong Method')
    } catch(err){next(err)}
});

//middleware for Bad request handling
app.use((err,req,res,next)=>{
    console.log(`error ${err.message}`);
    const status = err.status || 400;
    res.status(status).send({error:err.message})
});



