import Layout from "@/components/Layout";
import SurveyPage from "@/components/pages/SurveyPage";
import { SurveysStore } from "@/store/surveys.slice";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={SurveysStore}>
      <Layout>
        <SurveyPage />
      </Layout>
    </Provider>
  );
}

export default App;
