import Layout from "@/components/Layout";
import Dropdown from "@/components/organisms/Dropdown";

function App() {
  return (
    <Layout>
      <div className="flex w-full flex-col gap-4">
        <Dropdown />
      </div>
    </Layout>
  );
}

export default App;
