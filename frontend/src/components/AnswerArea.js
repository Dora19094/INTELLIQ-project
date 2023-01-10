import React from "react";
import { Card, Button } from "react-bootstrap";

export default function AnswerArea({ question }) {
  if (question) {
    return (
      <div>
        {question.options.length === 1 ? (
          <Card>
            <Card.Body>
              <Card.Title style={{ marginBottom: "15px" }}>Answer</Card.Title>
              <input placeholder={question.options[0].opttxt}></input>
            </Card.Body>
          </Card>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
