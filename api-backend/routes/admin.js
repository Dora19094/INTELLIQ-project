//admin routes
const express = require('express');
const router = express.Router();
const Blank = require('../models/blank');
const Answers = require('../models/answer');
const mongoose = require('mongoose');
const multer = require("multer");
const upload = multer();


//1
//To stop mongoDB windows_key + R => services.msc
router.get('/healthcheck',(req,res,next)=>{
    if(mongoose.connection.readyState===1){
        res.send({status: "OK", dbconnection:'mongodb://127.0.0.1/intelliQ'})
    } else{
        res.status(500).send({status: "failed", dbconnection:'mongodb://127.0.0.1/intelliQ'});
    }
});

//2
router.post('/questionnaire_upd',upload.none(),(req,res,next)=>{
    let newBlank = new Blank(JSON.parse(req.body.file));
    newBlank.save()
        .then(savedDoc => res.send({status:"OK"}))
        .catch(err=>next(err));
});

//3
router.post('/resetall',(req,res,next)=>{
    Answers.Answer.find({},(err_answers,data_answers)=>{
        if(err_answers){
            next(err_answers)
        } else {
            Blank.find({},(err_blank,data_blank)=>{
                if(err_blank){
                    next(err_blank);
                } else {
                    try{
                        if(!data_answers.length && !data_blank.length){
                            const error = new Error("No more data to be deleted");
                            error.status = "402";
                            throw error;
                        } else if(data_answers.length && data_blank.length){
                            Answers.Answer.deleteMany({})
                                .then(Blank.deleteMany({}))
                                .then(res.send({status:"OK"}))
                                .catch(err=>next(err))
                        } else if(data_answers.length){
                            Answers.Answer.deleteMany({})
                                .then(res.send({status:"OK"}))
                                .catch(err=>next(err))
                        }
                        else if(data_blank.length){
                            Blank.deleteMany({})
                                .then(res.send({status:"OK"}))
                                .catch(err=>next(err))
                        }
                    } catch(err){
                        next(err);
                    }
                }
            })
        }
    })
});

//4
router.post('/resetq/:questionnaireID', (req,res,next)=>{
    Answers.Answer.find({'questionnaireID':req.params.questionnaireID}, (err,data)=>{
        if(err){
            next(err);
        } else {
            try{
                if(data.length>0){
                    Answers.Answer.find({'questionnaireID':req.params.questionnaireID}).deleteMany()
                        .then((returned)=>{res.send({status:"OK"})})
                        .catch(err=>next(err));
                } else { 
                    const error = new Error("Questionnaire does not exist")
                    error.status = "402";
                    throw error;
                }
            } catch(err) {next(err)}
        }
    })
});

module.exports = router;