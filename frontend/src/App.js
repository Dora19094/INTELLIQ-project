import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import QuestionnaireArea from "./components/QuestionnaireArea";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="questionnaires" element={<QuestionnaireArea />} />

          {/* In next Step i have to implement following Routes */}

          {/* <Route
            path="/questionnaire/:questionnaireID"
            element={<QuestionnaireDetailsArea />}
          />
          <Route
            path="/question/:questionnaireID/:questionID"
            element={<QuestionArea />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
