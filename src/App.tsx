import Input from "@/components/atoms/Input";
import Layout from "@/components/Layout";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import Card from "@/components/molecules/Card";

function App() {
  return (
    <Layout>
      <div className="flex w-full flex-col gap-4">
        <Card>
          <Input.SubTitle />
          <ButtonIcon iconType="close" />
        </Card>
        <Card>
          <Input.SubTitle />
          <ButtonIcon iconType="close" />
        </Card>
      </div>
    </Layout>
  );
}

export default App;
