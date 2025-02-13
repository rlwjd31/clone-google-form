import Input from "@/components/atoms/Input";
import CheckboxGroup from "@/components/organisms/CheckboxGroup";
import Dropdown from "@/components/organisms/Dropdown";
import RadioGroup from "@/components/organisms/RadioGroup";
import { LocalStateType } from "@/components/templates/survey-question-block/slice";
import { useSelector } from "react-redux";

export default function QuestionsByType() {
  const questionType = useSelector(
    (state: LocalStateType) => state.questionType
  );
  const questions = useSelector((state: LocalStateType) => state.questions);

  // console.log('qu');
  switch (questionType) {
    case "short-text":
      return <Input.Description placeholder="단답형" disabled />;
    case "long-text":
      return <Input.Description placeholder="장문형" disabled />;
    case "check-box":
      return (
        <CheckboxGroup options={!Array.isArray(questions) ? [""] : questions} />
      );
    case "radio-button":
      return (
        <RadioGroup options={!Array.isArray(questions) ? [""] : questions} />
      );
    case "arrow-drop-down-circle":
      // TODO: dropdown에 해당되는 UI구현
      return <Dropdown />;
  }
  return <div>해당 질문 종류는 존재하지 않습니다.</div>;
}
