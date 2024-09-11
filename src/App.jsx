import { useState } from "react";
import Home from "./components/Home";
import RequirementForm from "./components/RequirementForm";
import DynamicTablePage from "./components/DynamicTablePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Home /> */}
      {/* <RequirementForm /> */}

      <DynamicTablePage />
    </>
  );
}

export default App;
