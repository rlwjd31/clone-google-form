import Input from "@/components/atoms/Input";
import Layout from "@/components/Layout";
import Card from "@/components/molecules/Card";
import PreviewQuestionsBlock from "@/components/templates/PreviewQuestionsBlock";
import { SurveyIdProvider } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";

import { useRef } from "react";
import { useSelector } from "react-redux";

export default function PreviewPage() {
  const surveys = useSelector((state: GlobalState) => state.surveysState);
  const surveyRefs = useRef<HTMLDivElement[]>([]);
  const { surveyTitle, description } = useSelector((state: GlobalState) => ({
    surveyTitle: state.surveyTitle,
    description: state.description,
  }));

  return (
    <Layout>
      <div className="relative flex w-full flex-col items-center gap-4 pb-10 [&_.hidden-preview-mode]:pointer-events-none">
        <Card className="relative w-full pb-6" draggable={false}>
          <div className="absolute left-0 top-0 z-20 h-3 w-full rounded-t-md bg-purple-primary" />
          <div className="flex w-full flex-col gap-1">
            <Input.Title
              className={"pointer-events-none mt-6"}
              placeholder="설문지 제목"
              value={surveyTitle}
            />
            <Input.Description
              className="pointer-events-none"
              placeholder="설문지 설명"
              value={description}
            />
          </div>
        </Card>

        {/* Survey rendering영역 */}
        <div className="relative flex w-full flex-col gap-4">
          {surveys.map(({ surveyId }, index) => (
            <div
              key={surveyId}
              ref={(element) => {
                surveyRefs.current[index] = element!;
              }}
            >
              <SurveyIdProvider surveyIdProp={surveyId}>
                <PreviewQuestionsBlock />
              </SurveyIdProvider>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
