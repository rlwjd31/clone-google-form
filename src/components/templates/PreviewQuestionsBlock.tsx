import Input from "@/components/atoms/Input";
import Card from "@/components/molecules/Card";
import QuestionsByType from "@/components/templates/survey-question-block/QuestionsByType";
import { useSurveyIdContext } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { useSelector } from "react-redux";

export default function PreviewQuestionsBlock() {
  const surveyId = useSurveyIdContext();
  const { questionTitle, isRequired } = useSelector((state: GlobalState) => ({
    ...state.surveysState.find((survey) => survey.surveyId === surveyId)?.state,
  }));

  return (
    <Card className="pb-8">
      <div className="mb-6 flex items-start gap-8">
        <div className="relative w-full">
          <Input.SubTitle disabled value={questionTitle} />
          {isRequired && (
            <span className="absolute left-0 top-0 translate-x-1 translate-y-4 text-lg text-red-600">
              *
            </span>
          )}
        </div>
      </div>
      <QuestionsByType />
    </Card>
  );
}
