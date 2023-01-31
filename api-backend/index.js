const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');


//setup express app
const app = express();

//connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/intelliQ')
    .then(result=>{
        console.log('Connected to DB');
    })
    .catch(err=>console.log(err))
mongoose.Promise = global.Promise;

app.listen(3000,()=>{
    console.log('Start listening on port 3000');
});

//middleware for accesing data in json
app.use(bodyParser.json());

app.use(cors({origin:'localhost:3000'}));


//admin endpoints
app.use('/admin',require('./routes/admin.js'));

//intelliQ routes
app.use(require('./routes/intelliQ.js'));

//errors from bad requests
app.all('*',(req,res,next)=>{
    try{
        throw new Error('Wrong URI or Wrong Method')
    } catch(err){next(err)}
});

//middleware for error handling
app.use((err,req,res,next)=>{
    console.log(`error ${err.message}`);
    const status = err.status || 400;
    res.status(status).send({status:"Failed",error:err.message})
});