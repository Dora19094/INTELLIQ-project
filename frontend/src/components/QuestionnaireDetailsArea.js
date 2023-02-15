import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

export function QuestionnaireDetailsArea() {
  const [questionnaire, setQuestionnare] = useState();
  const { questionnaireID } = useParams();
  const navigate = useNavigate();

  function createRandomString(max) {
    return Math.floor(Math.random() * max) + 1000;
  }

  //a. {baseURL}/questionnaire/:questionnaireID
  useEffect(() => {
    const url = `https://localhost:3001/questionnaire/${questionnaireID}`;

    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {console.log(data); const d = [data]; setQuestionnare(d)});
    }; //if you want to run the json server instead of the backend you need to change:
    //   this     .then((data) => {console.log(data); const d = [data]; setQuestionnare(d)});
    //   to this  .then(data) => {setQuestionnaire(data)}
    // and do it on every component

    fetchData();
    if (questionnaire) {
      //console.log(questionnaire);
     // console.log(questionnaire[0]._id);
    } // we add [0] because resource is & returns a list
  }, [] ); 

  function fetchQuestion(questionnaire) {
    // const url = `http://localhost:3001/question/${questionnaire.questionnaireID}/${questionnaire.qID}}`;
    const paramQuestionnaireID = questionnaire.questionnaireID; //_id on db
    const temp = questionnaire.questions[0];
    // there was a space on "qID " on json-server so add one here too if you run json server, if you run backend then its ok.
    const paramQuestionID = temp["qID"];
    const paramSession = createRandomString(9999);

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
      {questionnaire && ( //if the questionnaire is defined
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
              {questionnaire[0].questionnaireTitle 
              }
            </Card.Header>
            <Card.Img variant="top" />
            <Card.Body style={{ background: "whitesmoke" }}>
              <Card.Text style={{ textAlign: "center", color: "#483d8b" }}>
                Total Questions:
                {questionnaire[0].questions &&
                  questionnaire[0].questions.length  //see the total number of questions on this questionnaire
                  }
              </Card.Text>
              <Card.Text style={{ textAlign: "center", color: "#483d8b" }}>
                Questions with profile type:
                {
                  questionnaire[0].questions.filter(
                    (question) => question.type === "profile"
                  ).length  //see how many questions with profile type there are on this questionnaire
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
