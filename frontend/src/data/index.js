const questionnaires = require("./questionnaires.json");
const questions = require("./questions.json");
// const answers = require("./answers.json");
module.exports = () => ({
  questionnaires: questionnaires.questionnaires,
  questions: questions.questions,
  // doanswer: answers,
});
