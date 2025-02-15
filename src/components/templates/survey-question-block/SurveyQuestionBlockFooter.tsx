import Toggle from "@/components/atoms/Toggle";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { useSurveyIdContext } from "@/store/SurveyIdProvider";
import {
  copyQuestion,
  deleteQuestion,
  GlobalActionType,
  GlobalState,
  setIsRequired,
} from "@/store/surveys.slice";
import { useDispatch, useSelector } from "react-redux";

export default function SurveyQuestionBlockFooter() {
  const surveyId = useSurveyIdContext();
  const { isRequired } = useSelector((state: GlobalState) => ({
    ...state.surveysState.find((survey) => survey.surveyId === surveyId)?.state,
  }));
  const dispatch = useDispatch<GlobalActionType>();
  return (
    <div className="mt-10 flex justify-end border-t border-t-neutral-200 py-4">
      <ButtonIcon
        iconType="content-copy"
        visibleToolTip
        tooltipPosition="bottom"
        onClick={() => dispatch(copyQuestion({ surveyId }))}
      />
      <ButtonIcon
        iconType="delete"
        visibleToolTip
        onClick={() => dispatch(deleteQuestion({ surveyId }))}
      />
      <div className="ml-3 mr-5 w-px bg-neutral-300" />
      <div className="flex items-center gap-5">
        <span>필수</span>
        <Toggle
          enabled={!!isRequired}
          setEnabled={() =>
            dispatch(setIsRequired({ surveyId, isRequired: !isRequired }))
          }
        />
      </div>
    </div>
  );
}

// {
//   surveyId: 2,
//   state: createInitialSurveyState("check-box") as SurveyState<QuestionType>,
// },
// {
//   surveyId: 3,
//   state: createInitialSurveyState("check-box") as SurveyState<QuestionType>,
// },
// {
//   surveyId: 4,
//   state: createInitialSurveyState("check-box") as SurveyState<QuestionType>,
// },
// {
//   surveyId: 5,
//   state: createInitialSurveyState("check-box") as SurveyState<QuestionType>,
// },
