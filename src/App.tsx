import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LeafletReactMap from "./components/LeafletReactMap";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LeafletReactMap />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
