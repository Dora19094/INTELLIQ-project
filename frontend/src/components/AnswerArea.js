import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AnswerArea({ question, questionNum, session }) {
  const [answer, setAnswer] = useState();
  const navigate = useNavigate();

  async function fireAnswer() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answer),
    };

    if (answer) {
      await fetch("http://localhost:3001/doanswer", requestOptions).then(
        (response) => response.json()
      );
    }
  }
  function fetchNextQuestion(questionID) {
    console.log(questionID);
    console.log(question.questionnaireID);

    if (question.options[0].nextqID === "-") {
      navigate(
        `/question/${question.questionnaireID}/submit`,
        {}
      );
      //navigate("/questionnaires");
      ///question/:questionnaireID/:questionID/submit
    } else {
      navigate(`/question/${question.questionnaireID}/${questionID}`, {
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
                    session: session,
                    questionID: question.qID,
                    questionnaireID: question.questionnaireID,
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
                  <div key={option.optID}>
                    <input
                      name="answer-choice"
                      value={option.optID}
                      type="radio"
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
            fireAnswer();
            fetchNextQuestion(question.options[0].nextqID);
          }}
        >
          Skip
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            fireAnswer();
            fetchNextQuestion(question.options[0].nextqID);
          }}
        >
          Next
        </Button>
      </div>
    );
  }
}
