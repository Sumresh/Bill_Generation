import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import DynamicTablePage from "./components/DynamicTablePage";

import "bootstrap-icons/font/bootstrap-icons.css";
import UpdateTablePage from "./components/UpdateTablePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DynamicTablePage" element={<DynamicTablePage />} />
          <Route path="/Update-table" element={<UpdateTablePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
