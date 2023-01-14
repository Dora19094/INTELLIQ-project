//intelliQ routes
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BlankSchema = require('../models/blank.js');
const _ = require('lodash');
const { findById } = require('../models/blank.js');
const Answers = require('../models/answer.js');
const json2csv = require('json2csv');

// 1. first required endpoint
router.get('/questionnaire/:questionnaireID', function(req, res, next){ 
    BlankSchema.find({_id :req.params.questionnaireID})
    .then(function(data){ 
        const sorted_questions = _.flatMap(data,'questions');
        sorted_questions.sort(function(a,b){
            return a.qID.toLowerCase().localeCompare(b.qID.toLowerCase()); 
        });
        let jdata = {questionnaireID : data[0]._id,                         
                    questionnaireTitle: data[0].questionnaireTitle,
                    keywords : data[0].keywords,
                    questions: sorted_questions};

        if (req.query.format == "json" || req.query.format == null) res.send(jdata);
        else if (req.query.format == "csv") 
        {
            const csvdata = json2csv.parse(jdata);
            res.attachment('jdata.csv');
            res.status(200).send(csvdata);
        }
        else 
        {
            throw new Error('Format has to be set to either json or csv!');
        }
        
    })
    .catch(err=>res.send({status:"failed", reason:err.message}))
});

//2. Second required endpoint
router.get('/questionnaire/:questionnaireID/:questionID', function(req,res,next){ //need to update for csv format
    BlankSchema.find({_id : req.params.questionnaireID},'questions')
    .then(function(data){
        let questions = _.flatMap(data,'questions');
        let question = _.filter(questions,{qID : req.params.questionID});
        let options = _.flatMap(question,'options').sort(function(a,b){
            return a.optID.toLowerCase().localeCompare(b.optID.toLowerCase());
        });
        let jdata = {
            questionnaireID : req.params.questionnaireID,
            qID : question[0].qID,
            qtext : question[0].qtext,
            type : question[0].type,
            options : options
        };
        if (req.query.format == "json" || req.query.format == null) res.send(jdata);
        else if (req.query.format == "csv") 
        {
            const csvdata = json2csv.parse(jdata);
            res.attachment('jdata.csv');
            res.status(200).send(csvdata);
        }
        else 
        {
            throw new Error('Format has to be set to either json or csv!');
        }
        
    })
    .catch(err=>res.send({status:"failed", reason:err.message}))

});


//third required endpoint
router.post('/questionnaire/:questionnaireID/:questionID/:session/:optionID', function(req,res,next){
    Answers.Answer.find({questionnaireId : req.params.questionnaireID, session : req.params.session},'answers')
    .then(function(data){
        let new_ans = new Answers.AnswerOne();
        new_ans.qID = req.params.questionID;
        new_ans.ans = req.params.optionID;
        data[0].answers.push(new_ans);
        data[0].save().catch(err=>res.send({status:"failed", reason:err.message}));    //it creates an _id for that object which we will ignore
        res.send();
    })
    .catch(err=>res.send({status:"failed", reason:err.message}));

});

//fourth required endpoint




//fifth required endpoint 



module.exports = router;