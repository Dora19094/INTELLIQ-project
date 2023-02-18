import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem , Card} from "react-bootstrap";


export default function SessionAnswersArea() {
 
 const [answer, setAns] = useState();

 const params = useParams();
 const questionnaireID = params.questionnaireID;
 const session = params.session;

   //console.log(questionnaireID);
   //console.log(session);

  // d. {baseURL}/getsessionanswers/:questionnaireID/:session
 useEffect(() => {
    const url = `https://localhost:3001/intelliq_api/getsessionanswers/${questionnaireID}/${session}`;
    
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {console.log(data); const d = [data]; setAns(d)});
    }; 

    fetchData();
    //console.log(questionnaireID);
    //console.log(session);
}, [] ); 

  return (
    <div className="d-flex justify-content-center"> 
      <Card border="light" style={{ width: "600px", margin: "40px" }}>
        <Card.Header style={{
                textAlign: "left",
                color: "white",
                background: "#d2bed2",
              }}>
            <h1 style={{color: "white"}}>Your Answers </h1>
        </Card.Header>
        { answer&& (answer[0].answers.map((an) => (
          <div className="div-card" key={an.ans}> 
            <ListGroup>
              <ListGroupItem>
                <div className="d-flex justify-content-left">
                  <h5>{an.qtext}</h5>
                  <h5>  |  </h5>
                  <h5> {an.anstxt}</h5>
                </div>
              </ListGroupItem>
            </ListGroup>
          </div>
          ))
        )}
      </Card>
    </div>
  )
}
