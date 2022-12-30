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
        <div className="d-flex justify-content-center">
          <Card border="light" style={{ width: "600px", margin: "40px" }}>
            <Card.Header
              as="h5"
              style={{
                textAlign: "center",
                color: "white",
                background: "#d2bfd3",
              }}
            >
              {questionnaire[0].questionnaireTitle}
            </Card.Header>
            <Card.Img variant="top" />
            <Card.Body style={{ background: "whitesmoke" }}>
              {/* <Card.Title
              style={{ color: "darkslateblue", marginBottom: "15px" }}
            >
              {questionnaire[0].questionnaireTitle}
            </Card.Title> */}
              <Card.Text style={{ textAlign: "center", color: "#483d8b" }}>
                Total Questions:
                {questionnaire[0].questions &&
                  questionnaire[0].questions.length}
              </Card.Text>
              <Card.Text style={{ textAlign: "center", color: "#483d8b" }}>
                Questions with profile type:
                {
                  questionnaire[0].questions.filter(
                    (question) => question.type === "profile"
                  ).length
                }
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button
                  style={{
                    /* darkslateblue 483d8b*/
                    background: "#d2bed2",
                    border: "#d2bed2",
                    color: "white",
                    position: "relative",
                  }}
                  variant="secondary"
                  onClick={() => fetchQuestion(questionnaire[0])}
                >
                  Start
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
