import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function QuestionArea() {
  const { state } = useLocation();
  const [questionData, setQuestionData] = useState();

  useEffect(() => {
    //
    // const url = `http://localhost:3001/questions?questionnaireID=${state.questionnaireID}?questionID=${state.questionID}`;
    const url = `http://localhost:3001/questions?qID=${state.questionID}`;

    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setQuestionData(data));
    };

    fetchData();
  }, []);
  return <>{questionData && <div>{questionData[0].qtext}</div>}</>;
}
