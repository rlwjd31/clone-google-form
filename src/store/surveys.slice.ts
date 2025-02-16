import { OptionType } from "@/types/option.type";
import { QuestionType } from "@/types/question.type";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "surveysState";

type Questions<T extends QuestionType> = T extends
  | "check-box"
  | "radio-button"
  | "dropdown"
  ? Array<OptionType>
  : undefined;

export type SurveyState<T extends QuestionType> = {
  lastOptionNumber: number;
  questionTitle: string;
  questions: Questions<T>;
  questionType: T;
  isRequired: boolean;
};

type SetQuestionsPayloadType =
  | {
      surveyId: number;
      type: "ADD";
    }
  | {
      surveyId: number;
      type: "DELETE";
      optionId: number;
    }
  | {
      surveyId: number;
      type: "UPDATE";
      optionId: number;
      value: string;
    };

const initialStateFromStorage = (): SurveysState => {
  const serializedState = localStorage.getItem(STORAGE_KEY);

  return serializedState
    ? JSON.parse(serializedState)
    : createInitialSurveysState("short-text");
};

const createInitialSurveyState = <T extends QuestionType>(
  type: T
): SurveyState<T> => {
  return {
    lastOptionNumber: 3,
    questionTitle: "",
    questions: ([
      "check-box",
      "radio-button",
      "arrow-drop-down-circle",
    ].includes(type)
      ? [
          { optionId: 1, value: "옵션 1" },
          { optionId: 2, value: "옵션 2" },
          { optionId: 3, value: "옵션 3" },
        ]
      : undefined) as Questions<T>,
    questionType: type,
    isRequired: false,
  };
};

const createInitialSurveysState = (
  questionType: QuestionType
): SurveysState => ({
  lastSurveyId: 1,
  surveyTitle: "제목 없는 설문지",
  description: "설문지 설명",
  surveysState: [
    {
      surveyId: 1,
      state: createInitialSurveyState(
        questionType
      ) as SurveyState<QuestionType>,
    },
    {
      surveyId: 2,
      state: createInitialSurveyState("check-box") as SurveyState<QuestionType>,
    },
    {
      surveyId: 3,
      state: createInitialSurveyState(
        "arrow-drop-down-circle"
      ) as SurveyState<QuestionType>,
    },
    {
      surveyId: 4,
      state: createInitialSurveyState(
        "short-text"
      ) as SurveyState<QuestionType>,
    },
    {
      surveyId: 5,
      state: createInitialSurveyState("long-text") as SurveyState<QuestionType>,
    },
  ],
});

export type SurveysState = {
  lastSurveyId: number;
  surveyTitle: string;
  description: string;
  surveysState: Array<{ surveyId: number; state: SurveyState<QuestionType> }>;
};

const initialSurveysState = initialStateFromStorage();

const surveysSlice = createSlice({
  name: "surverysSlice",
  initialState: initialSurveysState,
  reducers: {
    setQuestionTitle: (
      state,
      action: PayloadAction<{ surveyId: number; value: string }>
    ) => {
      const { surveyId, value } = action.payload;
      const survey = state.surveysState.find(
        (state) => state.surveyId === surveyId
      );
      if (survey) {
        survey.state.questionTitle = value;
      }
    },
    setQuestions: (state, action: PayloadAction<SetQuestionsPayloadType>) => {
      const { surveyId } = action.payload;
      const survey = state.surveysState.find(
        (state) => state.surveyId === surveyId
      );
      if (survey && survey.state.questions) {
        switch (action.payload.type) {
          case "ADD":
            survey.state.lastOptionNumber += 1;
            survey.state.questions.push({
              optionId: survey.state.lastOptionNumber,
              value: `옵션 ${survey.state.lastOptionNumber}`,
            });
            break;
          case "DELETE": {
            const { optionId: payloadOptionId } = action.payload as {
              surveyId: number;
              type: "DELETE";
              optionId: number;
            };
            survey.state.questions = survey.state.questions.filter(
              ({ optionId }) => optionId !== payloadOptionId
            );
            break;
          }
          case "UPDATE": {
            const { optionId, value } = action.payload as {
              surveyId: number;
              type: "UPDATE";
              optionId: number;
              value: string;
            };
            survey.state.questions = survey.state.questions.map((question) => ({
              ...question,
              value: question.optionId === optionId ? value : question.value,
            }));
            break;
          }
        }
      }
    },
    setQuestionType: (
      state,
      action: PayloadAction<{ surveyId: number; questionType: QuestionType }>
    ) => {
      const { surveyId, questionType } = action.payload;
      const survey = state.surveysState.find(
        (state) => state.surveyId === surveyId
      );
      if (survey) {
        survey.state.questionType = questionType;
      }
    },
    setIsRequired: (
      state,
      action: PayloadAction<{ surveyId: number; isRequired: boolean }>
    ) => {
      const { surveyId, isRequired } = action.payload;
      const survey = state.surveysState.find(
        (state) => state.surveyId === surveyId
      );
      if (survey) {
        survey.state.isRequired = isRequired;
      }
    },
    setSurveyTitle: (state, action: PayloadAction<string>) => {
      state.surveyTitle = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    copySurvey: (state, action: PayloadAction<{ surveyId: number }>) => {
      const nextLastSurveyId = state.lastSurveyId + 1;
      state.lastSurveyId = nextLastSurveyId;

      const targetIndex = state.surveysState.findIndex(
        (survey) => survey.surveyId === action.payload.surveyId
      );

      if (targetIndex !== -1) {
        state.surveysState.splice(targetIndex + 1, 0, {
          surveyId: nextLastSurveyId,
          state: {
            ...state.surveysState[targetIndex].state, // 깊은 복사로 동일한 상태 복사
          },
        });
      }
    },
    deleteSurvey: (state, action: PayloadAction<{ surveyId: number }>) => {
      state.surveysState = state.surveysState.filter(
        (survey) => survey.surveyId !== action.payload.surveyId
      );
    },
    addSurvey: (state) => {
      const nextLastSurveyId = state.lastSurveyId + 1;
      state.lastSurveyId = nextLastSurveyId;

      state.surveysState.push({
        surveyId: nextLastSurveyId,
        state: createInitialSurveyState("radio-button"),
      });
    },
    reorderSurveys: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.surveysState.splice(startIndex, 1);
      state.surveysState.splice(endIndex, 0, removed);
    },
  },
});

export const {
  setQuestionTitle,
  setQuestions,
  setQuestionType,
  setIsRequired,
  setSurveyTitle,
  setDescription,
  copySurvey,
  deleteSurvey,
  addSurvey,
  reorderSurveys,
} = surveysSlice.actions;

export const SurveysStore = configureStore({
  reducer: surveysSlice.reducer,
});
export type GlobalState = ReturnType<typeof SurveysStore.getState>;
export type GlobalActionType = typeof SurveysStore.dispatch;

SurveysStore.subscribe(() => {
  try {
    const surveysState = SurveysStore.getState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveysState));
  } catch (e) {
    console.warn("localStorage에 저장할 수 없습니다.", e);
  }
});
