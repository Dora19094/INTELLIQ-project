const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

//setup express app
const app = express();
app.use(cors({
    origin: '*'
}));

//connect to MongoDB
const connection = require('./db');

//middleware for accesing data in json
app.use(bodyParser.json());

//admin endpoints
app.use('/intelliq_api/admin', require('./routes/admin.js'));

//intelliQ routes
app.use('/intelliq_api', require('./routes/intelliQ.js'));

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

module.exports = app;