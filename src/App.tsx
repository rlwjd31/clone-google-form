import Icon from "@/components/atoms/Icon";
import Layout from "@/components/Layout";

function App() {
  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <Icon type="arrow-down-dropbox-circle" />
        <Icon type="short-text" />
        <Icon type="long-text" />
        <Icon type="check-box" />
        <Icon type="radio-button" />
        <Icon type="delete" />
        <Icon type="content-copy" />
        <Icon type="arrow-drop-up" />
        <Icon type="arrow-drop-down" />
        <Icon type="arrow-drop-down-circle" />
        <Icon type="add-circle" />
      </div>
    </Layout>
  );
}

export default App;
