import Input from "@/components/atoms/Input";
import Card from "@/components/molecules/Card";
import SurveyQuestionBlock from "@/components/templates/survey-question-block/SurveyQuestionBlock";
import { SurveyIdProvider } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";

export default function SurveyPage() {
  const surveys = useSelector((state: GlobalState) => state.surveysState);

  return (
    <div className="flex flex-col items-center gap-8 size-full">
      <Card
        className="relative overflow-hidden pb-6"
        <div className="absolute left-0 top-0 z-20 h-3 w-full bg-purple-primary" />
        <div className="flex w-full flex-col gap-1">
          <Input.Title
            className={cn(
              "mt-6",
            )}
          />
          <Input.Description
            className={cn(
            )}
            placeholder="설문지 설명"
          />
        </div>
      </Card>
      {surveys.map(({ surveyId }) => (
        <SurveyIdProvider surveyIdProp={surveyId}>
          <SurveyQuestionBlock />
        </SurveyIdProvider>
      ))}
    </div>
  );
}
