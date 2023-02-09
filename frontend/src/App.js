import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import { QuestionnaireArea } from "./pages/QuestionnaireArea";
import { QuestionnaireDetailsArea } from "./components/QuestionnaireDetailsArea";
import "./App.css";
import QuestionArea from "./components/QuestionArea";
import SubmitArea from "./components/SumbitArea";
import SessionAnswersArea from "./components/SessionAnswersArea";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="questionnaires" element={<QuestionnaireArea />} />
          <Route
            path="/questionnaires/:questionnaireID"
            element={<QuestionnaireDetailsArea />}
          />
          <Route
            path="/question/:questionnaireID/:questionID"
            element={<QuestionArea />}
          />
          <Route
            path="/question/:questionnaireID/:session/submit"
            element={<SubmitArea />}
          />
           <Route
            path="/getsessionanswers/:questionnaireID/:session"
            element={<SessionAnswersArea />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
