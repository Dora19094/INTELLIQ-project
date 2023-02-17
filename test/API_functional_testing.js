//This is the scripts for API functional testing using Postman.
//{baseURL} = https://localhost:3001/intelliq_api/
//{baseURL}/questionnaire/:questionnaireID

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var jsonData = pm.response.json();

pm.test("JSON data is not empty", function () {
    pm.expect(jsonData).to.not.be.empty;
});

pm.test("Response should be a JSON object", function () {
    pm.response.to.be.json;
});

pm.test("Check the content of the JSON response", function () {
    var jsonData = pm.response.json();

    pm.expect(jsonData.questionnaireTitle).to.equal("Online Shopping attitudes");
    
});

//{baseURL}/question/:questionnaireID/:questionID

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var jsonData = pm.response.json();

pm.test("JSON data is not empty", function () {
    pm.expect(jsonData).to.not.be.empty;
});

pm.test("Response should be a JSON object", function () {
    pm.response.to.be.json;
});

//{baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

//{baseURL}/getsessionanswers/:questionnaireID/:session
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var jsonData = pm.response.json();

pm.test("JSON data is not empty", function () {
    pm.expect(jsonData).to.not.be.empty;
});

pm.test("Response should be a JSON object", function () {
    pm.response.to.be.json;
});

//{baseURL}/getquestionanswers/:questionnaireID/:questionID
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var jsonData = pm.response.json();

pm.test("JSON data is not empty", function () {
    pm.expect(jsonData).to.not.be.empty;
});

pm.test("Response should be a JSON object", function () {
    pm.response.to.be.json;
});

//{baseURL}/questionnaires_Extra endpoint that returns all blanks questionnaires.
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var jsonData = pm.response.json();

pm.test("JSON data is not empty", function () {
    pm.expect(jsonData).to.not.be.empty;
});

pm.test("Response should be a JSON object", function () {
    pm.response.to.be.json;
});