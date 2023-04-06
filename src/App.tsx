import React from "react";
import logo from "./logo.svg";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import MyMap from "./components/Map";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="" element={<MyMap/>}/>
            </Routes>
        </Router>
    </>
  );
}

export default App;
