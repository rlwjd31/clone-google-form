import { QuestionType } from "@/types/question.type";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Questions<T extends QuestionType> = T extends "check-box"
  ? string[]
  : string;

type SurveyQuestionBlockState<T extends QuestionType> = {
  questionTitle: string;
  setQuestionTitle: Dispatch<SetStateAction<string>>;
  questions: Questions<T>;
  setQuestions: Dispatch<SetStateAction<Questions<T>>>;
  questionType: T;
  isRequired: boolean;
  setIsRequired: Dispatch<SetStateAction<boolean>>;
  setQuestionType: (type: T) => void;
};

const SurveyQuestionBlockContext =
  createContext<SurveyQuestionBlockState<QuestionType> | null>(null);

export function SurveyQuestionBlockProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questions, setQuestions] = useState<string[] | string>("");
  const [questionType, setQuestionType] = useState<QuestionType>("short-text");
  const [isRequired, setIsRequired] = useState(false);

  return (
    <SurveyQuestionBlockContext.Provider
      value={{
        questionTitle,
        setQuestionTitle,
        questions,
        setQuestions,
        questionType,
        isRequired,
        setQuestionType,
        setIsRequired,
      }}
    >
      {children}
    </SurveyQuestionBlockContext.Provider>
  );
}

export const useSurveyQuestionBlock = <
  T extends QuestionType
>(): SurveyQuestionBlockState<T> => {
  const context = useContext(SurveyQuestionBlockContext);
  if (!context) {
    throw new Error(
      "useSurveyQuestionBlock must be used within a SurveyQuestionBlockProvider"
    );
  }
  return context as unknown as SurveyQuestionBlockState<T>;
};
