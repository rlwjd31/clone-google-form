import Layout from "@/components/Layout";
import Card from "@/components/molecules/Card";
import { useLoaderData, useLocation } from "react-router-dom";

type ParsedFormData = {
  surveyTitle: string;
  description: string;
  answers: {
    questionTitle: string;
    answer: string | string[];
  }[];
};

export default function SumbitPage() {
  const location = useLocation();
  const formData = location.state?.parsedFormData as ParsedFormData;

  if (!formData) return <div>오류가 발생했습니다🥵🥵🥵🥵</div>;

  const { surveyTitle, description, answers } = formData;
  return (
    <Layout>
      <Card className="py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl ">{surveyTitle}</h1>
          <p className="text-2xl text-neutral-700">{description}</p>
        </div>
        <Divider />
        {answers.map(({ questionTitle, answer }) => {
          return (
            <div className="mt-6" key={`${questionTitle}-${answer}`}>
              <div>
                <span className="mr-1 text-lg">{questionTitle}</span>
                <span className="mr-3">:</span>
                <span>
                  {Array.isArray(answer)
                    ? answer.length === 0
                      ? "❌"
                      : answer.join(", ")
                    : answer || "❌"}
                </span>
              </div>
            </div>
          );
        })}
      </Card>
    </Layout>
  );
}

function Divider() {
  return <hr className="w-full mt-4 border-2 border-neutral-300" />;
}
