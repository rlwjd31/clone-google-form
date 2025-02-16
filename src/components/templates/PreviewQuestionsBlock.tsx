import Input from "@/components/atoms/Input";
import Card from "@/components/molecules/Card";
import { useSurveyIdContext } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { useSelector } from "react-redux";
import PreviewCheckboxGroup from "@/components/organisms/PreviewCheckboxGroup";
import PreviewRadioGroup from "@/components/organisms/PreviewRadioGroup";
import Dropdown from "@/components/organisms/Dropdown";
import Icon from "@/components/atoms/Icon";
import { useFormContext } from "react-hook-form";
import { useCustomFormContext } from "@/store/CustomFormProvider";

export default function PreviewQuestionsBlock() {
  const surveyId = useSurveyIdContext();
  const { questionTitle, isRequired } = useSelector((state: GlobalState) => ({
    ...state.surveysState.find((survey) => survey.surveyId === surveyId)?.state,
  }));

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Card className="pb-8">
      <div className="flex items-start gap-2 pt-4">
        <div className="relative w-full">
          <Input.SubTitle disabled value={questionTitle} inputStyle="px-2" />
          {isRequired && (
            <span className="absolute left-0 top-0 translate-x-1 translate-y-4 text-lg text-red-600">
              *
            </span>
          )}
        </div>
      </div>
      <PreviewQuestionsByType />
      <div className="mt-6 flex gap-4 pl-2">
        <Icon type="error" />
        <p className="text-red-primary">필수 질문입니다.</p>
      </div>
    </Card>
  );
}

function PreviewQuestionsByType() {
  const surveyId = useSurveyIdContext();
  const { questionType, questions } = useSelector((state: GlobalState) => ({
    ...state.surveysState.find((survey) => survey.surveyId === surveyId)?.state,
  }));
  const { setValue, trigger } = useFormContext();
  const customFormNameContext = useCustomFormContext();

  switch (questionType) {
    case "short-text":
      return (
        <Input.Description
          inputStyle="ml-[10px]"
          placeholder="단답형"
          onChange={(e) => {
            setValue(customFormNameContext?.formName ?? "", e.target.value);
            trigger(customFormNameContext?.formName ?? "");
          }}
        />
      );
    case "long-text":
      return (
        <Input.Description
          inputStyle="ml-[10px]"
          placeholder="장문형"
          onChange={(e) => {
            setValue(customFormNameContext?.formName ?? "", e.target.value);
            trigger(customFormNameContext?.formName ?? "");
          }}
        />
      );
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
      return <Dropdown className="ml-1" contents={questions} />;
  }
  return <div>해당 질문 종류는 존재하지 않습니다.</div>;
}
