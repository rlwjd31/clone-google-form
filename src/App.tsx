import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreviewPage from "@/components/pages/PreviewPage";
import SurveyPage from "@/components/pages/SurveyPage";
import { SurveysStore } from "@/store/surveys.slice";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={SurveysStore}>
      <Router>
        <Routes>
          <Route path="/" element={<SurveyPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
