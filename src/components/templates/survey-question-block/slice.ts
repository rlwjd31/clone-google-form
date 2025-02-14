import { QuestionType } from "@/types/question.type";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Questions<T extends QuestionType> = T extends
  | "check-box"
  | "radio-button"
  | "dropdown"
  ? string[]
  : undefined;

type SurveyQuestionBlockState<T extends QuestionType> = {
  questionTitle: string;
  questions: Questions<T>;
  questionType: T;
  isRequired: boolean;
};

const getInitialState = <T extends QuestionType>(
  type: T
): SurveyQuestionBlockState<T> => {
  return {
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
    setQuestions: (
      state,
      action: PayloadAction<{
        type: "ADD" | "DELETE";
        value: string;
      }>
    ) => {
      if (state.questions) {
        switch (action.payload.type) {
          case "ADD":
            state.questions.push(action.payload.value);
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
