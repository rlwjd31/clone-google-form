import Layout from "@/components/Layout";
import ButtonIcon from "@/components/molecules/ButtonIcon";

function App() {
  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <ButtonIcon iconType="close" />
      </div>
    </Layout>
  );
}

export default App;
