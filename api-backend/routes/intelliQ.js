//intelliQ routes
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BlankSchema = require('../models/blank.js');
const _ = require('lodash');
const { findById } = require('../models/blank.js');
const Answers = require('../models/answer.js');
const json2csv = require('json2csv');


//a
router.get('/questionnaire/:questionnaireID', function(req, res, next){ 
    BlankSchema.find({_id :req.params.questionnaireID})
    .then(function(data){ 
        let sorted_questions = _.flatMap(data,'questions');
        sorted_questions.sort(function(a,b){
            return a.qID.toLowerCase().localeCompare(b.qID.toLowerCase()); 
        });
        sorted_questions = _.map(sorted_questions,function(q){
            const r = new Boolean(q.required);
            return {qID : q.qID,
                    qtext : q.qtext,
                    required : r.toString(),
                    type : q.type
                    };
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
    //.catch(err=>res.send({status:"failed", reason:err.message}))
    .catch(err=>next(err));
});

//b
router.get('/question/:questionnaireID/:questionID', function(req,res,next){ 
    BlankSchema.find({_id : req.params.questionnaireID},'questions')
    .then(function(data){
        let questions = _.flatMap(data,'questions');
        let question = _.filter(questions,{qID : req.params.questionID});
        let options = _.flatMap(question,'options').sort(function(a,b){
            return a.optID.toLowerCase().localeCompare(b.optID.toLowerCase());
        });
        options = _.map(options,function(o){
            return {
                optId : o.optID,
                opttxt : o.opttxt,
                nextqID : o.nextqID
            };
        });
        const r = new Boolean(question[0].required);
        let jdata = {
            questionnaireID : req.params.questionnaireID,
            qID : question[0].qID,
            qtext : question[0].qtext,
            required : r.toString(),
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
    //.catch(err=>res.send({status:"failed", reason:err.message}))
    .catch(err=>next(err));
});

//c
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', function(req,res,next){
    Answers.Answer.find({questionnaireId : req.params.questionnaireID, session : req.params.session},'answers')
    .then(function(data){
        let new_ans = new Answers.AnswerOne();
            new_ans.qID = req.params.questionID;
            new_ans.ans = req.params.optionID;
        if (data[0] != undefined)
        {
            data[0].answers.push(new_ans);
            data[0].save().catch(err=>res.send({status:"failed", reason:err.message}));    //it creates an _id for that object/we ignore for now
            res.send();
        }
        else {
            let newAnswersheet = new Answers.Answer();
            newAnswersheet.questionnaireID = req.params.questionnaireID;
            newAnswersheet.session = req.params.session;
            newAnswersheet.answers.push(new_ans); 
            console.log(newAnswersheet);
            newAnswersheet.save().catch(err=>res.send({status:"failed", reason:err.message})); 
            res.send();
        }
        
    })
    //.catch(err=>res.send({status:"failed", reason:err.message}));
    .catch(err=>next(err));
});

//d


router.get('/getsessionanswers/:questionnaireID/:session', function(req, res, next) {
    const { questionnaireID, session } = req.params;
    BlankSchema.find({_id : req.params.questionnaireID}).then(blank => 
        Answers.Answer.find({ questionnaireID: req.params.questionnaireID, session: req.params.session })
        .then(data => {
            console.log("Data[0]\n", data[0]);
            let sortedAnswers = data[0].answers;
            sortedAnswers.sort((a, b) => { if (a.qID != undefined && b.qID != undefined) a.qID.toLowerCase().localeCompare(b.qID.toLowerCase())});
            var q,a,qinfo = blank[0].questions;
            let jdata = {
                questionnaireID: data[0]._id,
                session: data[0].session,
                answers: _.map(sortedAnswers,function(o){
                    q = _.find(qinfo, {qID : o.qID});
                    a = _.find(q.options,{optID : o.ans});
                    return {
                        qID : o.qID,
                        qtext : q.qtext,
                        ans : o.ans,
                        anstxt : a.opttxt
                    }
                })
            }
            if (req.query.format === 'json' || !req.query.format) {
                res.send(jdata);
            } else if (req.query.format === 'csv') {
                const csvData = json2csv.parse(jdata);
                res.attachment('jdata.csv');
                res.status(200).send(csvData);
            } else {
                throw new Error('Format has to be set to either "json" or "csv"');
            }
        })
        .catch(err => next(err)))
    
});

  
//e 
router.get('/getquestionanswers/:questionnaireID/:questionID', function(req, res, next){
    const { questionnaireID, questionID } = req.params;
    Answers.Answer.find({ questionnaireID: questionnaireID, qID: questionID})
    .then(function(data){ 
        if (!data) {
            throw new Error('No data found');
        }
        //console.log(data);
        let result = _.flatMap(data, function(obj){
            return {answer : _.find(obj.answers, {qID : questionID}), session:obj.session }
        });

        result.sort(function(a,b){
            return a.timestamp - b.timestamp; 
        });
        
        result = _.map(result,function(z){
            return {
                    session: z.session,
                    ans : z.answer.ans
                    };
        });

        let jdata = {
            questionnaireID: questionnaireID,
            questionID: questionID,
            answers: result
        };

        if (req.query.format === 'json' || !req.query.format) {
            res.send(jdata);
        } else if (req.query.format === 'csv') {
            const csvData = json2csv.parse(jdata);
            res.attachment('jdata.csv');
            res.status(200).send(csvData);
        } else {
            throw new Error('Format has to be set to either "json" or "csv"');
        }
    })
    .catch(err => next(err));
});

//Extra endpoint that returns all the blank questionnaires that are in the db
router.get('/questionnaires', function(req, res, next){ 
    BlankSchema.find()
    .then(function(data){
        if (data == {}) res.send("No questionnaires have been saved!");
        else  
        res.send(data);
    })
    .catch(err=>next(err));
});

//Extra endpoint that returns all the questions of a specific questionnaire
router.get('/questionnaires/:questionnaireID/allQuestions', function(req, res, next){ 
    BlankSchema.find({_id :req.params.questionnaireID})
    .then(function(data){
        if (data == {}) res.send("No such questionnaire!");
        else  
        res.send(data[0].questions);
    })
    .catch(err=>next(err)); 
});


module.exports = router;