import Input from "@/components/atoms/Input";
import Card from "@/components/molecules/Card";
import Dropdown from "@/components/organisms/Dropdown";
import QuestionsByType from "@/components/templates/survey-question-block/QuestionsByType";
import {
  LocalStateActionType,
  LocalStateType,
  setQuestionTitle,
  setQuestionType,
  SurveyQuestionBlockStore,
} from "@/components/templates/survey-question-block/slice";
import SurveyQuestionBlockFooter from "@/components/templates/survey-question-block/SurveyQuestionBlockFooter";
import { QuestionType } from "@/types/question.type";
import { Provider, useDispatch, useSelector } from "react-redux";

function SurveyQuestionBlock() {
  const questionTitle = useSelector(
    (state: LocalStateType) => state.questionTitle
  );
  const dispatch = useDispatch<LocalStateActionType>();
  const setDropdownValue = (value: QuestionType) => {
    dispatch(setQuestionType(value));
  };

  return (
    <Card>
      <div className="mb-6 flex items-start gap-12">
        <Input.SubTitle
          value={questionTitle}
          onChange={(e) => dispatch(setQuestionTitle(e.target.value))}
        />
        <Dropdown setValue={setDropdownValue} />
      </div>
      <QuestionsByType />

      <button className="mt-4 cursor-pointer self-start rounded-md border border-neutral-300 px-4 py-2 shadow-sm">
        질문 추가
      </button>
      <SurveyQuestionBlockFooter />
    </Card>
  );
}

export default function SurveyQuestionBlockWrapped() {
  return (
    <Provider store={SurveyQuestionBlockStore}>
      <SurveyQuestionBlock />
    </Provider>
  );
}
