import { QuestionType } from "@/types/question.type";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Questions<T extends QuestionType> = T extends
  | "check-box"
  | "radio-button"
  | "dropdown"
  ? string[]
  : string;

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
      ? [""]
      : "") as Questions<T>,
    questionType: type,
    isRequired: false,
  };
};

const initialState = getInitialState(
  "short-text"
) as SurveyQuestionBlockState<QuestionType>;

const surveyQuestionBlockSlice = createSlice({
  name: "surveyQuestionBlockSlice",
  initialState,
  reducers: {
    setQuestionTitle: (state, action: PayloadAction<string>) => {
      state.questionTitle = action.payload;
    },
    setQuestions: (state, action: PayloadAction<string>) => {
      if (Array.isArray(state.questions)) {
        const foundIndex = state.questions.indexOf(action.payload);

        if (foundIndex > -1) {
          state.questions.splice(foundIndex, 1);
        } else {
          state.questions.push(action.payload);
        }
      } else {
        state.questions = action.payload;
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
