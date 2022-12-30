//admin routes
const express = require('express');
const router = express.Router();
const Blank = require('../models/blank');
const mongoose = require('mongoose');


router.get('/healthcheck',(req,res,next)=>{
    if(mongoose.connection.readyState===1){
        res.send({status: "OK", dbconnection:'mongodb://127.0.0.1/intelliQ'})
    } else{
        res.status(500).send({status: "failed", dbconnection:'mongodb://127.0.0.1/intelliQ'})
    }
});

router.post('/questionnaire_udp',(req,res,next)=>{
    res.send({function: "questionnaire upload"});
});

router.post('/resetall',(req,res,next)=>{
    res.send({function: "reset all"});
});

router.post('/resetq/:questionnaireID',(req,res,next)=>{
    console.log(req);
    res.send({function: "reset questionnaire", id: req.params.questionnaireID});
});

module.exports = router;