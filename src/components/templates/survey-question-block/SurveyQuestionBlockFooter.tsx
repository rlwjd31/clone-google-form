import Toggle from "@/components/atoms/Toggle";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import {
  LocalStateActionType,
  LocalStateType,
  setIsRequired,
} from "@/components/templates/survey-question-block/slice";
import { useDispatch, useSelector } from "react-redux";

export default function SurveyQuestionBlockFooter() {
  const isRequired = useSelector((state: LocalStateType) => state.isRequired);
  const dispatch = useDispatch<LocalStateActionType>();
  return (
    <div className="mt-10 flex justify-end border-t border-t-neutral-200 py-4">
      <ButtonIcon
        iconType="content-copy"
        visibleToolTip
        tooltipPosition="bottom"
      />
      <ButtonIcon iconType="delete" visibleToolTip />
      <div className="ml-3 mr-5 w-px bg-neutral-300" />
      <div className="flex items-center gap-5">
        <span>필수</span>
        <Toggle
          enabled={isRequired}
          setEnabled={() => dispatch(setIsRequired(!isRequired))}
        />
      </div>
    </div>
  );
}
