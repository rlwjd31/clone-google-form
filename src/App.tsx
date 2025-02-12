import Input from "@/components/atoms/Input";
import Layout from "@/components/Layout";

function App() {
  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <Input.SubTitle />
        <Input.Title />
        <Input.Description placeholder="장문형 텍스트" />
        <Input.SubTitle disabled />
        <Input.Title disabled />
        <Input.Description disabled placeholder="장문형 텍스트" />
      </div>
    </Layout>
  );
}

export default App;
