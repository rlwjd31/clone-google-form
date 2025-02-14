import { createContext, useContext, useState, ReactNode } from "react";

const SurveyIdContext = createContext<number | null>(null);

export const SurveyIdProvider = ({
  children,
  surveyIdProp,
}: {
  children: ReactNode;
  surveyIdProp: number;
}) => {
  const [surveyId] = useState(surveyIdProp);

  return (
    <SurveyIdContext.Provider value={surveyId}>
      {children}
    </SurveyIdContext.Provider>
  );
};

export const useSurveyIdContext = () => {
  const context = useContext(SurveyIdContext);
  if (!context)
    throw new Error("useSurveyIdContext must be used within SurveyIdProvider");
  return context;
};
