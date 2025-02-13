import Input from "@/components/atoms/Input";
import Toggle from "@/components/atoms/Toggle";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import Card from "@/components/molecules/Card";
import CheckboxGroup from "@/components/organisms/CheckboxGroup";
import Dropdown from "@/components/organisms/Dropdown";
import {
  LocalStateActionType,
  LocalStateType,
  setIsRequired,
  setQuestionTitle,
  SurveyQuestionBlockStore,
} from "@/components/templates/survey-question-block/slice";
import { Provider, useDispatch, useSelector } from "react-redux";

function SurveyQuestionBlockFooter() {
  const isRequired = useSelector((state: LocalStateType) => state.isRequired);
  const dispatch = useDispatch<LocalStateActionType>();
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
          enabled={isRequired}
          setEnabled={() => dispatch(setIsRequired(!isRequired))}
        />
      </div>
    </div>
  );
}

function SurveyQuestionBlock() {
  const questionTitle = useSelector(
    (state: LocalStateType) => state.questionTitle
  );
  const dispatch = useDispatch<LocalStateActionType>();

  return (
    <Card>
      <div className="flex items-start gap-12 mb-6">
        <Input.SubTitle
          value={questionTitle}
          onChange={(e) => dispatch(setQuestionTitle(e.target.value))}
        />
        <Dropdown />
      </div>
      {/* questiontype에 따른 분기 rendering영역 */}
      <CheckboxGroup options={["Apple", "Bannana", "Cherry"]} />
      {/* questiontype에 따른 분기 rendering영역 */}

      <button className="self-start px-4 py-2 mt-4 border rounded-md shadow-sm cursor-pointer border-neutral-300">
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
