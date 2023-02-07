import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function SumbitArea() {
  const [dataAnswers, setDataAnswers] = useState([]);
  const {questionnaireID , session} = useParams();
  //const {session} = useParams();
  const navigate = useNavigate();
  const [sessionanswers, setSessionAnswers] = useState();
  //const {a} =  useLocation();

//   useEffect(() => {
//     const url = `http://localhost:3001/getsessionanswers/${questionnaireID}/${session}`;
    
//     const fetchData = async () => {
//       await fetch(url)
//         .then((response) => response.json())
//         .then((data) => {console.log(data); const d = [data]; setSessionAnswers(d)});
//     };

//     fetchData();
// }, [] ); 

  function getsessionanswers() {

    // fetch d. {baseURL}/getsessionanswers/:questionnaireID/:session
    // we need questionnaireID & session, params from url
    // and then navigate to view answers page
   // don't forget to declare the url on app.js page
   navigate(`../../getsessionanswers/${questionnaireID}/${session}`, {
      // state: {
      //   answerID: sessionanswers.answers[0].ans,
      //   questionID: sessionanswers.answers[0].qID,
      //   //answerTEXT: 
       },
    );
}

  return (
    <div style={{ margin: "40px" }}>
      <Card>
        <Card.Body>
          <Card.Title style={{ marginBottom: "15px" }}>Thank you!</Card.Title>
          You have successfully submitted your answers.
        </Card.Body>
      </Card>
      <Button
          variant="primary"
          onClick={() => {
            getsessionanswers();
          }}
        >
          View your answers
      </Button>
      <Button
        variant="primary"
        onClick={() => navigate("/questionnaires")}
      >
        Return to questionnaires
      </Button>
    </div>
  );
}
