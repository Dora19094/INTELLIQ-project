import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
export function QuestionnaireDetailsArea() {
  const [questionnaire, setQuestionnare] = useState();
  const { questionnaireID } = useParams();

  // const url = `http://localhost:3001/questionnaires/${questionnaireID}`;
  const url = `http://localhost:3001/questionnaires?questionnaireID=${questionnaireID}`;
  // const data = fetch(url).then((response) => response.json());

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setQuestionnare(data));
    };

    // console.log(fetchData);
    fetchData();
    if (questionnaire) {
      console.log(questionnaire);
      console.log(questionnaire[0].questionnaireID);
    }
  }, []);

  function fetchQuestion(question) {
    // const url = `http://localhost:3001/questionnaires/${questionnaire.questionnaireID}/${questionnaire.qID}}`;
  }

  return (
    <div>
      {questionnaire && (
        <Card style={{ width: "400px", margin: "40px" }}>
          <Card.Img variant="top" />
          <Card.Body style={{ background: "#111111" }}>
            <Card.Title style={{ marginBottom: "15px" }}>
              {questionnaire[0].questionnaireTitle}
            </Card.Title>
            <Card.Text>
              Total Questions:
              {questionnaire[0].questions && questionnaire[0].questions.length}
            </Card.Text>
            <Card.Text>
              Questions with profile type:
              {
                questionnaire[0].questions.filter(
                  (question) => question.type === "profile"
                ).length
              }
            </Card.Text>
            <Button
              variant="success"
              onClick={() => fetchQuestion(questionnaire[0])}
            >
              Start
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
