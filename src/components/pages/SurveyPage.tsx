import SurveyQuestionBlock from "@/components/templates/survey-question-block/SurveyQuestionBlock";
import { SurveyIdProvider } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { useSelector } from "react-redux";

export default function SurveyPage() {
  const surveys = useSelector((state: GlobalState) => state.surveysState);

  return (
    <div className="flex size-full flex-col items-center gap-8">
      {/* TODO: survy big Title */}
      <div>survey big title</div>
      {surveys.map(({ surveyId }) => (
        <SurveyIdProvider surveyIdProp={surveyId}>
          <SurveyQuestionBlock />
        </SurveyIdProvider>
      ))}
    </div>
  );
}
