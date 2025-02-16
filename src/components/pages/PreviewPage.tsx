import { DevTool } from "@hookform/devtools";
import { useRef } from "react";
import { useSelector } from "react-redux";

import Input from "@/components/atoms/Input";
import Layout from "@/components/Layout";
import Card from "@/components/molecules/Card";
import PreviewQuestionsBlock from "@/components/templates/PreviewQuestionsBlock";
import { SurveyIdProvider } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormProvider } from "@/store/CustomFormProvider";
import { createFormName } from "@/utils/createFormName";

export default function PreviewPage() {
  const surveys = useSelector((state: GlobalState) => state.surveysState);
  const surveyRefs = useRef<HTMLDivElement[]>([]);
  const { surveyTitle, description } = useSelector((state: GlobalState) => ({
    surveyTitle: state.surveyTitle,
    description: state.description,
  }));
  const formMethods = useForm({
    mode: "all",
    defaultValues: {
      ...surveys.map(({ surveyId, state: { questionType } }) => ({
        [createFormName({ surveyId, questionType })]:
          questionType === "check-box" ? [] : "",
      })),
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const isRequiredExisted = surveys.some((survey) => survey.state.isRequired);

  return (
    <FormProvider {...formMethods}>
      <Layout>
        <form
          className=""
          onSubmit={handleSubmit((formData) =>
            console.log("submit event formData =>", formData)
          )}
        >
          {/* 설문지 제목 영역 */}
          <section className="relative flex w-full flex-col items-center gap-4 pb-10 [&_.hidden-preview-mode]:pointer-events-none">
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
              {isRequiredExisted && (
                <div className="mt-6 border-t border-neutral-300 pt-4 text-red-primary">
                  * 표시는 필수 질문임
                </div>
              )}
            </Card>

            {/* Survey rendering section */}
            <section className="relative flex w-full flex-col gap-4">
              {surveys.map(
                ({ surveyId, state: { isRequired, questionType } }, index) => {
                  const formName = createFormName({ surveyId, questionType });

                  return (
                    <>
                      <div
                        key={surveyId}
                        ref={(element) => {
                          surveyRefs.current[index] = element!;
                        }}
                      >
                        <SurveyIdProvider surveyIdProp={surveyId}>
                          <CustomFormProvider formName={formName}>
                            <PreviewQuestionsBlock />
                          </CustomFormProvider>
                        </SurveyIdProvider>
                      </div>
                      <input
                        placeholder="validation hidden input"
                        {...register(formName as `${number}`, {
                          // 다중 선택인 check-box가 아닐 땐 단일 string 값이므로 required만 적용
                          ...(questionType !== "check-box" && {
                            required: isRequired,
                          }),
                          // 다중 선택인 check-box일 때
                          ...(isRequired &&
                            questionType === "check-box" && {
                              validate: {
                                noEmptyArray: (value) =>
                                  Array.isArray(value) && value.length > 0,
                              },
                            }),
                        })}
                      />
                    </>
                  );
                }
              )}
            </section>
          </section>
          {/* 설문지 하단 제출, 양식지우기 section */}
          <section className="mb-12 flex items-center justify-between">
            <button
              type="submit"
              className="rounded-md bg-purple-primary px-8 py-3 text-white disabled:bg-neutral-400"
              disabled={!isValid ? true : false}
            >
              제출
            </button>
            {/* TODO: 모든 form의 value들을 초기화하는 기능 구현 */}
            <button type="button" className="text-purple-primary">
              양식 지우기
            </button>
          </section>
          <DevTool control={control} />
        </form>
      </Layout>
    </FormProvider>
  );
}
