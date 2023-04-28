import React from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import LeafletReactMap from "./components/LeafletReactMap";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LeafletReactMap/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
