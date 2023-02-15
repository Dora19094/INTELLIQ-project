import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
// style
import logo from "../logo.svg";
import "./QuestionnaireArea.css";

export function QuestionnaireArea() {
  const [questionnaires, setQuestionnare] = useState([]);

  //extra endpoint that gives me all questionnaires so i can display them as cards 
  const url = "https://localhost:3001/questionnaires";
  useEffect(() => {
    const fetchData = async () => {
      console.log("test");
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setQuestionnare(data));
    };

    fetchData();
    if (questionnaires) {
      // console.log(questionnaires[0].questionnaireID);
    }
  }, [] ); //[] fetch everytime the page reloads

  return (
    <div className="questionnaires-grid">
      {questionnaires.map((questionnaire) => ( //map the questionnaires into an array 
        <div className="div-card" key={questionnaire._id}>
          <div className="d-flex justify-content-center">
            <img
              src={logo}
              width="64"
              height="64"
              vertical-align="middle"
              alt=""
            />
          </div>
          <h3>{questionnaire.questionnaireTitle}</h3>
          <div className="d-flex justify-content-end">
            <Button
              as={Link}
              to={`/questionnaires/${questionnaire._id}`}
              variant="primary"
            >
              Answer it
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
