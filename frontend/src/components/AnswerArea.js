import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AnswerArea({ question, questionNum, session }) {
  const [answer, setAnswer] = useState();
  const navigate = useNavigate();
  async function fireAnswer() {

    //c. {baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID
    if (answer) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer),
      }; 
      const url = `https://localhost:3001/intelliq_api/doanswer/${question.questionnaireID}/${question.qID}/${session}/${answer.optionID}`
      await fetch(url, requestOptions).then(
       // (response) => response.json() // provokes error, ok when commenting it out
      );
      console.log(answer);
    }
  } 

  function fetchNextQuestion(questionID) {
    // console.log("hello");
    // console.log(answer.nextqID);
    // console.log(question);
    // console.log(questionID);
    // console.log(question.questionnaireID);

    if (questionID === "-") {  //if there is no next question then navigate to submit page 
      navigate(
        `/question/${question.questionnaireID}/${session}/submit`,
        {});
    } else {
      navigate(`/question/${question.questionnaireID}/${questionID}`, {  //else navigate to next question & pass those parameters
        state: { 
          questionnaireID: question.questionnaireID,
          questionID: questionID,
          questionNum: questionNum + 1,
          session: session,
        },
      });
    }
  }

  if (question) {
    return (
      <div>
        {question.options.length === 1 ? ( //if the length of the option is 1 then it's input text 
          <Card>
            <Card.Body>
              <Card.Title style={{ marginBottom: "15px" }}>Answer</Card.Title>
              <input
                placeholder={question.options[0].opttxt}
                onChange={(e) =>
                  setAnswer({
                    optionID: e.target.value, //what the user typed, goes into optID (might have been better if it was optionText but it would need different implementation on backend etc.)
                    session: session,
                    questionID: question.qID,
                    questionnaireID: question.questionnaireID,
                    nextqID: question.options[0].nextqID
                  })
                }
              ></input>
            </Card.Body>
          </Card>
        ) : ( // if the length is not 1 then it's multiple choice
          <div>
            <Card>
              <Card.Body>
                <Card.Title style={{ marginBottom: "15px" }}>Answer</Card.Title>
                {question.options.map((option) => (
                  <div key={option.optId}>
                    <input
                      name="answer-choice"
                      value={option.optId}
                      type="radio"
                      onChange={(e) =>
                        setAnswer({
                          optionID: e.target.value, //what the user chose as an answer
                          session: session,
                          questionID: question.qID,
                          questionnaireID: question.questionnaireID,
                          nextqID: option.nextqID
                        })
                      }
                    ></input>
                    <label>{option.opttxt}</label>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div> 
        )}
        <Button
          variant="secondary"
          disabled={question.required === "true"}  //if it's required then disable skip button
          onClick={() => {
            //no need to POST if they skip, fetch next question based on option 0's next question ID
            fetchNextQuestion(question.options[0].nextqID); 
          }}
        >
          Skip
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            fireAnswer();   //POST 
            fetchNextQuestion(answer.nextqID);  //fetch next question based on the chosen option's next questionID
          }}
        >
          Next
        </Button>
      </div>
    );
  }
}
