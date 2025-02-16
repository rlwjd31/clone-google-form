import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreviewPage from "@/components/pages/PreviewPage";
import SurveyPage from "@/components/pages/SurveyPage";
import { SurveysStore } from "@/store/surveys.slice";
import { Provider } from "react-redux";
import SumbitPage from "@/components/pages/SumbitPage";

function App() {
  return (
    <Provider store={SurveysStore}>
      <Router>
        <Routes>
          <Route path="/" element={<SurveyPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/result" element={<SumbitPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
