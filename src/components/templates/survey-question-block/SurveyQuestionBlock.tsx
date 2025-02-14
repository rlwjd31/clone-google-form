import Input from "@/components/atoms/Input";
import Card from "@/components/molecules/Card";
import Dropdown from "@/components/organisms/Dropdown";
import QuestionsByType from "@/components/templates/survey-question-block/QuestionsByType";
import SurveyQuestionBlockFooter from "@/components/templates/survey-question-block/SurveyQuestionBlockFooter";
import useClickOutside from "@/hooks/useClickOustside";
import { useSurveyIdContext } from "@/store/SurveyIdProvider";
import {
  GlobalActionType,
  GlobalState,
  setQuestions,
  setQuestionTitle,
  setQuestionType,
} from "@/store/surveys.slice";
import { QuestionType } from "@/types/question.type";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

export default function SurveyQuestionBlock() {
  const surveyId = useSurveyIdContext();
  const { questionTitle, isRequired, questionType } = useSelector(
    (state: GlobalState) => ({
      ...state.surveysState.find((survey) => survey.surveyId === surveyId)
        ?.state,
    })
  );

  const dispatch = useDispatch<GlobalActionType>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardFocused, setIsCardFocused] = useState(false);
  useClickOutside(cardRef, () => setIsCardFocused(false));

  const setDropdownValue = (value: QuestionType | string) => {
    dispatch(
      setQuestionType({ surveyId, questionType: value as QuestionType })
    );
  };

  const addOption = () => {
    dispatch(
      setQuestions({
        surveyId,
        type: "ADD",
      })
    );
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
      <div className="flex items-start gap-8 mb-6">
        <div className="relative w-full">
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
            onChange={(e) =>
              dispatch(setQuestionTitle({ surveyId, value: e.target.value }))
            }
            onBlur={(e) => {
              if (e.target.value === "") {
                dispatch(setQuestionTitle({ surveyId, value: "질문" }));
              }
            }}
          />
          {!isCardFocused && isRequired && (
            <span className="absolute top-0 left-0 text-lg text-red-600 translate-x-1 translate-y-4">
              *
            </span>
          )}
        </div>
        {isCardFocused && (
          <Dropdown questionType={questionType} setValue={setDropdownValue} />
        )}
      </div>
      <QuestionsByType
        className={cn(!isCardFocused && "[&_.hidden-preview-mode]:hidden")}
        isFocused={isCardFocused}
      />

      {isCardFocused && isOptionAddButtonShouldeBeRender && (
        <button
          onClick={addOption}
          className="self-start px-4 py-2 mt-4 border rounded-md shadow-sm cursor-pointer items-cener border-neutral-300"
        >
          옵션 추가
        </button>
      )}

      {isCardFocused && <SurveyQuestionBlockFooter />}
    </Card>
  );
}
