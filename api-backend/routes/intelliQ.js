//intelliQ routes
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BlankSchema = require('../models/blank.js');
const _ = require('lodash');
const { findById } = require('../models/blank.js');
const AnswerSchema = require('../answer.js');
//var omit = require('object.omit');
//const Question = require('../models/blank.js');


// it sends all the questions of a specific questionnaire
router.get('/questionnaire/:questionnaireID/only_questions', function(req, res, next){
    BlankSchema.find({_id :req.params.questionnaireID},'questions')
    .then(function(data){ 
        let all_questions = _.map(_.flatMap(data,'questions'),'qtext');
       // console.log(all_questions);
        res.send(all_questions);
    })
    .catch(err=>res.send({status:"failed", reason:err.message}))
});

// 1. first required endpoint
router.get('/questionnaire/:questionnaireID', function(req, res, next){ 
    BlankSchema.find({_id :req.params.questionnaireID})
    .then(function(data){ 
        const sorted_questions = _.flatMap(data,'questions');
        sorted_questions.sort(function(a,b){
            return a.qID.toLowerCase().localeCompare(b.qID.toLowerCase()); 
        });

        res.send({_id : data[0]._id,                           //maybe find nicer way to export the data (with key replace)
            questionnaireTitle: data[0].questionnaireTitle,
            keywords : data[0].keywords,
            questions: sorted_questions});
        
    })
    .catch(err=>res.send({status:"failed", reason:err.message}))
});

//2. Second required endpoint
router.get('/questionnaire/:questionnaireID/:questionID', function(req,res,next){
    BlankSchema.find({_id : req.params.questionnaireID},'questions')
    .then(function(data){
        let questions = _.flatMap(data,'questions');
        let question = _.filter(questions,{qID : req.params.questionID});
        let options = _.flatMap(question,'options').sort(function(a,b){
            return a.optID.toLowerCase().localeCompare(b.optID.toLowerCase());
        });
        
        res.send({
            _id : question[0]._id,
            qID : question[0].qID,
            qtext : question[0].qtext,
            type : question[0].type,
            options : options
        });
    })
    .catch(err=>res.send({status:"failed", reason:err.message}))

});


//third required endpoint
router.post('/questionnaire/:questionnaireID/:questionID/:session/:optionID', function(req,res,next){
    AnswerSchema

    
    //.catch(err=>res.send({status:"failed", reason:err.message}))

});

module.exports = router;