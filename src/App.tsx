import React from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { MapWidget } from "./components/Map";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<MapWidget center={[51.163361, 10.447683]} zoom={7} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
