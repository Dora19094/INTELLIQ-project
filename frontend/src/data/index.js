const questionnaires = require("./questionnaires.json");
const questions = require("./questions.json");

module.exports = () => ({
  questionnaires: questionnaires.questionnaires,
  questions: questions.questions,
});
