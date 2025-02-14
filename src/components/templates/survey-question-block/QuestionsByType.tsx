import Input from "@/components/atoms/Input";
import CheckboxGroup from "@/components/organisms/CheckboxGroup";
import Dropdown from "@/components/organisms/Dropdown";
import RadioGroup from "@/components/organisms/RadioGroup";
import { useSurveyIdContext } from "@/store/SurveyIdProvider";
import {
  GlobalActionType,
  GlobalState,
  setQuestions,
} from "@/store/surveys.slice";
import { cn } from "@/utils/cn";
import { ChangeEvent, FocusEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

type QuestionsByTypeProps = {
  isFocused?: boolean;
  className?: string;
};

export default function QuestionsByType({
  isFocused,
  className,
}: QuestionsByTypeProps) {
  const surveyId = useSurveyIdContext();
  const { questionType, questions } = useSelector((state: GlobalState) => ({
    ...state.surveysState.find((survey) => survey.surveyId === surveyId)?.state,
  }));
  const dispatch = useDispatch<GlobalActionType>();

  const deleteOption = (id: number) => {
    dispatch(
      setQuestions({
        surveyId,
        type: "DELETE",
        optionId: id,
      })
    );
  };

  const onChangeInputHandler = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch(
      setQuestions({
        surveyId,
        type: "UPDATE",
        optionId: id,
        value: e.target.value,
      })
    );
  };

  const onBlurInputHandler = (e: FocusEvent<HTMLInputElement>, id: number) => {
    if (e.target.value === "") {
      dispatch(
        setQuestions({
          surveyId,
          type: "UPDATE",
          optionId: id,
          value: `옵션 ${id}`,
        })
      );
    }
  };

  switch (questionType) {
    case "short-text":
      return <Input.Description placeholder="단답형" disabled />;
    case "long-text":
      return <Input.Description placeholder="장문형" disabled />;
    case "check-box":
      return (
        <CheckboxGroup
          className={cn(
            !isFocused && "[&_.input-underline-neutral]:hover:opacity-0",
            className
          )}
          options={!Array.isArray(questions) ? [] : questions}
          onClickDeleteHandler={deleteOption}
          onChangeInputHandler={onChangeInputHandler}
          onBlurInputHandler={onBlurInputHandler}
        />
      );
    case "radio-button":
      return (
        <RadioGroup
          className={cn(
            !isFocused && "[&_.input-underline-neutral]:hover:opacity-0",
            className
          )}
          options={!Array.isArray(questions) ? [] : questions}
          onClickDeleteHandler={deleteOption}
          onChangeInputHandler={onChangeInputHandler}
          onBlurInputHandler={onBlurInputHandler}
        />
      );
    case "arrow-drop-down-circle":
      // TODO: dropdown에 해당되는 UI구현
      return <Dropdown />;
  }
  return <div>해당 질문 종류는 존재하지 않습니다.</div>;
}
