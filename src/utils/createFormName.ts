type CreateFormNameType = (params: {
  surveyId: number;
  questionType: string;
}) => string;

export const createFormName: CreateFormNameType = ({
  surveyId,
  questionType,
}) => `survey-${surveyId}-${questionType}`;
