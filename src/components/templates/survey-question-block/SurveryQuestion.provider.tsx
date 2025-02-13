import { QuestionType } from "@/types/question.type";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type SurveyQuestionBlockState = {
  questionTitle: string;
  setQuestionTitle: Dispatch<SetStateAction<string>>;
  questions: string[] | string;
  setQuestions: Dispatch<SetStateAction<string[] | string>>;
  questionType: QuestionType;
  isRequired: boolean;
  setIsRequired: Dispatch<SetStateAction<boolean>>;
  setQuestionType: (type: QuestionType) => void;
};

const SurveyQuestionBlockContext =
  createContext<SurveyQuestionBlockState | null>(null);

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

export const useSurveyQuestionBlock = (): SurveyQuestionBlockState => {
  const context = useContext(SurveyQuestionBlockContext);
  if (!context) {
    throw new Error(
      "useSurveyQuestionBlock must be used within a SurveyQuestionBlockProvider"
    );
  }
  return context;
};
