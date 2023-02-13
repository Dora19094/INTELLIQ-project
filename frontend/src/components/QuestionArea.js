import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AnswerArea from "./AnswerArea";

export default function QuestionArea() {
  const { state } = useLocation();
  const [questionData, setQuestionData] = useState();


  useEffect(() => {
    // the following url is the right one for the final API Backend
     //const url = `http://localhost:3001/question?questionnaireID=${state.questionnaireID}?questionID=${state.questionID}`;
    const url = `https://localhost:3001/question/${state.questionnaireID}/${state.questionID}`

    // due to json-server, cannot simulate the right url so i tested the following one
    // const url = `http://localhost:3001/questions?qID=${state.questionID}`;

    //console.log(state.questionID); // OK
    //console.log(state.questionnaireID); // OK
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {console.log(data); const d = [data]; setQuestionData(d)});

    };
   //console.log(fetchData);
    fetchData();
   // if(questionData)
    console.log(questionData);

  }, [state.questionID]); //[[state.questionID]]
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
          <AnswerArea
            question={questionData[0]}
            questionNum={state.questionNum}
            session={state.session}
            //option = {state.question.option[0].optID}
           // questionnaireID={state.questionnaireID} //}/getsessionanswers/:questionnaireID/:session
          ></AnswerArea>
        </div>
      )}
    </>
  );
}
