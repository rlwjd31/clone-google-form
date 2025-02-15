import Input from "@/components/atoms/Input";
import Card from "@/components/molecules/Card";
import QuestionsByType from "@/components/templates/survey-question-block/QuestionsByType";
import DropdownGroup from "@/components/organisms/DropdownGroup";
import { useSurveyIdContext } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";
import PreviewCheckboxGroup from "@/components/organisms/PreviewCheckboxGroup";
import PreviewRadioGroup from "@/components/organisms/PreviewRadioGroup";
import Dropdown from "@/components/organisms/Dropdown";

export default function PreviewQuestionsBlock() {
  const surveyId = useSurveyIdContext();
  const { questionTitle, isRequired, questions } = useSelector(
    (state: GlobalState) => ({
      ...state.surveysState.find((survey) => survey.surveyId === surveyId)
        ?.state,
    })
  );

  return (
    <Card className="pb-8">
      <div className="flex items-start gap-8 mb-6">
        <div className="relative w-full">
          <Input.SubTitle disabled value={questionTitle} />
          {isRequired && (
            <span className="absolute top-0 left-0 text-lg text-red-600 translate-x-1 translate-y-4">
              *
            </span>
          )}
        </div>
      </div>
      <PreviewQuestionsByType />
    </Card>
  );
}

function PreviewQuestionsByType() {
  const surveyId = useSurveyIdContext();
  const { questionType, questions } = useSelector((state: GlobalState) => ({
    ...state.surveysState.find((survey) => survey.surveyId === surveyId)?.state,
  }));

  switch (questionType) {
    case "short-text":
      return <Input.Description placeholder="단답형" />;
    case "long-text":
      return <Input.Description placeholder="장문형" />;
    case "check-box":
      return (
        <PreviewCheckboxGroup
          options={!Array.isArray(questions) ? [] : questions}
        />
      );
    case "radio-button":
      return (
        <PreviewRadioGroup
          options={!Array.isArray(questions) ? [] : questions}
        />
      );
    case "arrow-drop-down-circle":
      // TODO: dropdown에 해당되는 UI구현
      return <Dropdown contents={questions} />;
  }
  return <div>해당 질문 종류는 존재하지 않습니다.</div>;
}
