const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerOneSchema = new Schema({
    qID:{
        type: String
    },  
    ans:{
        type: String
    }
});

const AnswerSchema = new Schema({
    questionnaireID:{
        type: String,
        required: [true, "Questionnaire ID is required"]
    },
    session : String,
    answers: {
        type: [AnswerOneSchema]
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
