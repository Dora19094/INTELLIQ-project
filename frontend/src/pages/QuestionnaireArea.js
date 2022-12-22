import React, { useEffect, useState } from "react";

// style
import "./QuestionnaireArea.css";


export function QuestionnaireArea() {
  const [questionnaires, setQuestionnare] = useState([]);

  const url = "http://localhost:3001/questionnaires";
  // const data = fetch(url).then((response) => response.json());
  // .then((data) => setQuestionnare(data));
  useEffect(() => {
    const fetchData = async () => {
      console.log("test");
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setQuestionnare(data));
    };

    // console.log(fetchData);
    fetchData();
    if (questionnaires) {
      // console.log(questionnaires[0].questionnaireID);
    }
  }, []);

  return (
    <div className="questionnaires-grid">
      {questionnaires.map((questionnaire) => (
        <div className="div-card" key={questionnaire.questionnaireID}>
          <h3>{questionnaire.questionnaireTitle}</h3>
        </div>
      ))}
    </div>
  );
}

