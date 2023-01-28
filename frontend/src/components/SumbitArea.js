import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SumbitArea() {
  const [dataAnswers, setDataAnswers] = useState([]);
  const navigate = useNavigate();

  function getsessionanswers() {}

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
