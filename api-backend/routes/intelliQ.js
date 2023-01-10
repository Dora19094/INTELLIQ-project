//intelliQ routes
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BlankSchema = require('../models/blank.js');
const _ = require('lodash');
//const Question = require('../models/blank.js');



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
router.get('/questionnaire/:questionnaireID', function(req, res, next){ //needs to be updated 
    BlankSchema.find({_id :req.params.questionnaireID})
    .then(function(data){ 
        const _id = _.flatMap(data,'_id');   // need to find the function to extract it not in array type
        const keywords = _.flatMap(data,'keywords');
        const sorted_questions = _.flatMap(data,'questions');
        sorted_questions.sort(function(a,b){
            return a.qID.localeCompare(b.qID); // add toUpperCase here!!!
        });
        const qtitle = _.flatMap(data,'questionnaireTitle'); 
        res.send({_id :_id[0], questionnaireTitle: qtitle[0],keywords : keywords, questions: sorted_questions});
        
    })
    .catch(err=>res.send({status:"failed", reason:err.message}))
});

module.exports = router;