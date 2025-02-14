import Toggle from "@/components/atoms/Toggle";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { useSurveyIdContext } from "@/store/SurveyIdProvider";
import { GlobalActionType, GlobalState, setIsRequired } from "@/store/surveys.slice";
import { useDispatch, useSelector } from "react-redux";

export default function SurveyQuestionBlockFooter() {
  const surveyId = useSurveyIdContext();
  const { isRequired } = useSelector((state: GlobalState) => ({
    ...state.surveysState.find((survey) => survey.surveyId === surveyId)?.state,
  }));
  const dispatch = useDispatch<GlobalActionType>();
  return (
    <div className="flex justify-end py-4 mt-10 border-t border-t-neutral-200">
      <ButtonIcon
        iconType="content-copy"
        visibleToolTip
        tooltipPosition="bottom"
      />
      <ButtonIcon iconType="delete" visibleToolTip />
      <div className="w-px ml-3 mr-5 bg-neutral-300" />
      <div className="flex items-center gap-5">
        <span>필수</span>
        <Toggle
          enabled={!!isRequired}
          setEnabled={() => dispatch(setIsRequired({surveyId, isRequired: !isRequired}))}
        />
      </div>
    </div>
  );
}
