import Toggle from "@/components/atoms/Toggle";
import Layout from "@/components/Layout";
import { useState } from "react";

function App() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <Toggle enabled={enabled} setEnabled={setEnabled} />
      </div>
    </Layout>
  );
}

export default App;
