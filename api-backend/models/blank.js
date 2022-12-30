const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Option = new Schema({
    optID:{
        type: String,
        required: [true, 'Option id is required']
    },
    opttxt:{
        type: String,
        required: [true, "Option's text is required"]
    },
    nextqID:{
        type: String,
        default: "NULL"
    }
});

const Question = new Schema({
    qID: {
        type: String,
        required:[true, "Question's id is required"]
    },
    qtext:{
        type: String,
        required:[true, "Question's text is required"]
    },
    required:{
        type: Boolean,
        required:[true, "Question's required field is required"]
    },
    type:{
        type: String,
        required:[true, "Question's type is required"]
    },
    options:{
        type: [Option]
    }
});

const BlankSchema = new Schema({
    questionnaireTitle:{
        type:String,
        required:[true, "Questionnaire's title is required"]
    },
    keywords:{
        type:[String]
    },
    questions:{
        type: [Question]
    }
})

const Blank = mongoose.model('Blank', BlankSchema);
module.exports = Blank;