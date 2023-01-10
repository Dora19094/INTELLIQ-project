//admin routes
const express = require('express');
const router = express.Router();
const Blank = require('../models/blank');
const Answer = require('../models/answer');
const mongoose = require('mongoose');

//1 
//Check if to redirect error to middleware
router.get('/healthcheck',(req,res,next)=>{
    
    if(mongoose.connection.readyState===1){
        res.send({status: "OK", dbconnection:'mongodb://127.0.0.1/intelliQ'})
    } else{
        res.status(500).send({status: "failed", dbconnection:'mongodb://127.0.0.1/intelliQ'})
    }
});

//2
router.post('/questionnaire_udp',(req,res,next)=>{
    res.send(req);
});

//3
//what status should be returned when there are no documents to delete?
router.post('/resetall',(req,res,next)=>{
    Answer.find({}).deleteMany()
        .then((returned=>{
            if(returned.deletedCount===0){
                throw new Error('No more answers to be deleted with this questionnaireID')
            } else {
                Blank.find({}).deleteMany()
                    .then(returned=>{
                        if(returned.deletedCount>0) res.send({status:"OK"})
                        else {throw new Error('No more answers to be deleted with this questionnaireID')}
                    })
            }
        }))
        .catch(err=>res.send({status:"failed", reason:err.message}))
});



//4
//what status should be returned when there are no documents to delete?
router.post('/resetq/:questionnaireID',(req,res,next)=>{
    Answer.find({'questionnaireID':req.params.questionnaireID}).deleteMany()
        .then((returned)=>{
            if(returned.deletedCount>0) res.send({status:"OK"})
            else {throw new Error('No more answers to be deleted with this questionnaireID')}
        })
        .catch(err=>res.send({status:"failed", reason:err.message}));
});



module.exports = router;