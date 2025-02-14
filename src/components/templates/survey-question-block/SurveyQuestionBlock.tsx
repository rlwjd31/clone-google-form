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
import useClickOutside from "@/hooks/useClickOustside";
import { QuestionType } from "@/types/question.type";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

function SurveyQuestionBlock() {
  const { questionTitle, questionType } = useSelector(
    (state: LocalStateType) => ({
      questionTitle: state.questionTitle,
      questionType: state.questionType,
    })
  );
  const dispatch = useDispatch<LocalStateActionType>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardFocused, setIsCardFocused] = useState(false);
  useClickOutside(cardRef, () => setIsCardFocused(false));

  const setDropdownValue = (value: QuestionType) => {
    dispatch(setQuestionType(value));
  };

  const isOptionAddButtonShouldeBeRender =
    questionType !== "long-text" && questionType !== "short-text";

  return (
    <Card
      isCardFocused={isCardFocused}
      ref={cardRef}
      onClick={() => setIsCardFocused(true)}
      className={isCardFocused ? "" : "pb-8"}
    >
      <div className="mb-6 flex items-start gap-12">
        <Input.SubTitle
          className={cn(
            !isCardFocused
              ? "[&_div]:opacity-0 [&_.input-underline-neutral]:hover:opacity-0"
              : "[&_div]:opacity-100"
          )}
          inputStyle={cn(
            !isCardFocused && "bg-card hover:bg-card text-neutral-800"
          )}
          value={questionTitle}
          onChange={(e) => dispatch(setQuestionTitle(e.target.value))}
        />
        {isCardFocused && <Dropdown setValue={setDropdownValue} />}
      </div>
      <QuestionsByType
        className={cn(!isCardFocused && "[&_.hidden-preview-mode]:hidden")}
        isFocused={isCardFocused}
      />

      {isCardFocused && isOptionAddButtonShouldeBeRender && (
        <button
          onClick={addOption}
          className="items-cener mt-4 cursor-pointer self-start rounded-md border border-neutral-300 px-4 py-2 shadow-sm"
        >
          옵션 추가
        </button>
      )}

      {isCardFocused && <SurveyQuestionBlockFooter />}
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
