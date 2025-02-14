import { QuestionType } from "@/types/question.type";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Questions<T extends QuestionType> = T extends
  | "check-box"
  | "radio-button"
  | "dropdown"
  ? string[]
  : undefined;

type SurveyQuestionBlockState<T extends QuestionType> = {
  lastOptionNumber: number;
  questionTitle: string;
  questions: Questions<T>;
  questionType: T;
  isRequired: boolean;
};

type SetQuestionsPayloadType =
  | {
      type: "ADD";
      value?: undefined;
    }
  | {
      type: "DELETE";
      value: string;
    };

const getInitialState = <T extends QuestionType>(
  type: T
): SurveyQuestionBlockState<T> => {
  return {
    lastOptionNumber: 3,
    questionTitle: "",
    questions: (type === "check-box" ||
    type === "radio-button" ||
    type === "arrow-drop-down-circle"
      ? ["옵션 1", "옵션 2", "옵션 3"]
      : undefined) as Questions<T>,
    questionType: type,
    isRequired: false,
  };
};

const initialState = getInitialState(
  "check-box"
) as SurveyQuestionBlockState<QuestionType>;

const surveyQuestionBlockSlice = createSlice({
  name: "surveyQuestionBlockSlice",
  initialState,
  reducers: {
    setQuestionTitle: (state, action: PayloadAction<string>) => {
      state.questionTitle = action.payload;
    },
    setQuestions: (state, action: PayloadAction<SetQuestionsPayloadType>) => {
      if (state.questions) {
        switch (action.payload.type) {
          case "ADD":
            state.lastOptionNumber += 1;
            state.questions.push(`옵션 ${state.lastOptionNumber}`);
            break;
          case "DELETE":
            state.questions = state.questions.filter(
              (value) => value !== action.payload.value
            );
            break;
        }
      }
    },
    setQuestionType: (state, action: PayloadAction<QuestionType>) => {
      state.questionType = action.payload;
    },
    setIsRequired: (state, action: PayloadAction<boolean>) => {
      state.isRequired = action.payload;
    },
  },
});

export const {
  setQuestionTitle,
  setQuestions,
  setQuestionType,
  setIsRequired,
} = surveyQuestionBlockSlice.actions;

export const SurveyQuestionBlockStore = configureStore({
  reducer: surveyQuestionBlockSlice.reducer,
});

export type LocalStateType = ReturnType<
  typeof SurveyQuestionBlockStore.getState
>;

export type LocalStateActionType = typeof SurveyQuestionBlockStore.dispatch;
