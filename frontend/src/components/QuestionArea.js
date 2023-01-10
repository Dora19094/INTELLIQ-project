import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AnswerArea from "./AnswerArea";

export default function QuestionArea() {
  const { state } = useLocation();
  const [questionData, setQuestionData] = useState();

  useEffect(() => {
    // the following url is the right one for the final API Backend
    // const url = `http://localhost:3001/questions?questionnaireID=${state.questionnaireID}?questionID=${state.questionID}`;

    // due to json-server, cannot simulate the right url so i tested the following one
    const url = `http://localhost:3001/questions?qID=${state.questionID}`;

    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setQuestionData(data));
    };

    fetchData();
  }, []);
  return (
    <>
      {questionData && (
        <div style={{ margin: "40px" }}>
          <Card>
            <Card.Body>
              <Card.Title style={{ marginBottom: "15px" }}>
                {`Question .${state.questionNum} - Type: ${questionData[0].type}`}
              </Card.Title>
              <Card.Text>{questionData[0].qtext}</Card.Text>
            </Card.Body>
          </Card>
          <AnswerArea question={questionData[0]}></AnswerArea>
        </div>
      )}
    </>
  );
}
