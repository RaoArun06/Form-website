import React from "react";
import "./App.css";
import FormComponent from "./FormComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import EditResponse from "./EditResponse";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/edit" element={<EditResponse />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;


