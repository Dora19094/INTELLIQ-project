//admin routes
const express = require('express');
const router = express.Router();
const Blank = require('../models/blank');
const Answers = require('../models/answer');
const mongoose = require('mongoose');

//1
router.get('/healthcheck',(req,res,next)=>{
    if(mongoose.connection.readyState===1){
        res.send({status: "OK", dbconnection:'mongodb://127.0.0.1/intelliQ'})
    } else{
        res.status(500).send({status: "failed", dbconnection:'mongodb://127.0.0.1/intelliQ'})
    }
});

//2
router.post('/questionnaire_udp',(req,res,next)=>{
    let newBlank = new Blank(req.body);
    newBlank.save()
        .then(savedDoc => res.send({status:"OK"}))
        .catch(err=>next(err));
});

//3
router.post('/resetall',(req,res,next)=>{
    Answers.Answer.deleteMany({})
        .then(Blank.deleteMany({}).then(res.send({status:"OK"})))
        .catch(err=>next(err));
});

//4
router.post('/resetq/:questionnaireID',(req,res,next)=>{
    Answers.Answer.find({'questionnaireID':req.params.questionnaireID}).deleteMany()
        .then((returned)=>{
            if(returned.deletedCount>0) res.send({status:"OK"})
            else {throw new Error('No more answers to be deleted with this questionnaireID')}
        })
        .catch(err=>next(err));
});

module.exports = router;