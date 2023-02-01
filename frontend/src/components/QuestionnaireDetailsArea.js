import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

export function QuestionnaireDetailsArea() {
  const [questionnaire, setQuestionnare] = useState();
  const { _id } = useParams();
  const navigate = useNavigate();

  function createRandomString(max) {
    return Math.floor(Math.random() * max) + 1000;
    // return "xyzw";
  }

  useEffect(() => {
    // const url = `http://localhost:3001/questionnaires/${questionnaireID}`;
    const url = `http://localhost:3001/questionnaires?questionnaireID=${_id}`;
    //questionnsireID -> _id
    // const data = fetch(url).then((response) => response.json());
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setQuestionnare(data));
    };

     // console.log(fetchData);
    fetchData();
    if (questionnaire) {
      console.log(questionnaire);
      console.log(questionnaire[0]._id);
    } // we add [0] because resource is & returns a list
  }, []);

  function fetchQuestion(questionnaire) {
    // const url = `http://localhost:3001/question/${questionnaire.questionnaireID}/${questionnaire.qID}}`;
    const paramQuestionnaireID = questionnaire._id;
    const temp = questionnaire.questions[0];
    // there was a space on "qID " on json-server so we added one here too.
    const paramQuestionID = temp["qID"];
    const paramSession = createRandomString(9999);
    //navigate(url, {

    navigate(`/question/${paramQuestionnaireID}/${paramQuestionID}`, {
      state: {
        questionnaireID: paramQuestionnaireID,
        questionID: paramQuestionID,
        questionNum: 1,
        session: paramSession,
      },
    });
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
              <div
                id="str-btn-details"
                className="d-flex justify-content-center"
              >
                <Button
                  variant="primary"
                  style={{
                    position: "relative",
                  }}
                  // as={Link}
                  // to={`/question/${questionnaire[0].questionnaireID}/${questionnaire[0].questions[0].qID}`}
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
