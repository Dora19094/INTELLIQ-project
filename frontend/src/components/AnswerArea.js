import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AnswerArea({ question, questionNum, session }) {
  const [answer, setAnswer] = useState();
  const navigate = useNavigate();
  //const nextqid = answer.optionID;
  async function fireAnswer() {
    //console.log(question);
    if (answer) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer),
      }; //c. {baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID 
      const url = `https://localhost:3001/doanswer/${question.questionnaireID}/${question.qID}/${session}/${answer.optionID}`
      await fetch(url, requestOptions).then(
       // (response) => response.json() // provokes error, ok when commenting it out
      );
      console.log(answer);
    }
  } 

  function fetchNextQuestion(questionID) {
    console.log("hello");
    console.log(answer.nextqID);
    console.log(question);
    console.log(questionID);
    console.log(question.questionnaireID);

    if (answer.nextqID === "-" || questionID == "-") { //CHANGED
      navigate(
        `/question/${question.questionnaireID}/${session}/submit`,
        {});
    } else {
      navigate(`/question/${question.questionnaireID}/${questionID}`, { //questionID
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
        {question.options.length === 1 ? (
          <Card>
            <Card.Body>
              <Card.Title style={{ marginBottom: "15px" }}>Answer</Card.Title>
              <input
                placeholder={question.options[0].opttxt}
                onChange={(e) =>
                  setAnswer({
                    optionID: e.target.value,
                    //optionID: question.options[0].optId,
                    //optionText: e.target.value, //""  answer.optionID
                    session: session,
                    questionID: question.qID,
                    questionnaireID: question.questionnaireID,
                    nextqID: question.options[0].nextqID
                  })
                }
              ></input>
            </Card.Body>
          </Card>
        ) : (
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
                          //e.target.checked   e.target.value
                          optionID: e.target.value,
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
          disabled={question.required === "TRUE"}
          onClick={() => {
            //fireAnswer(); //CHANGED
            fetchNextQuestion(question.options[0].nextqID); //question.options[0].nextqID //CHANGED
          }}
        >
          Skip
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            fireAnswer();   
            fetchNextQuestion(answer.nextqID); //question.options[0].nextqID 
          }}
        >
          Next
        </Button>
      </div>
    );
  }
}
