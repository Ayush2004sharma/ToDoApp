import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ToDo from "./components/ToDo";
import Login from "./components/Login";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
  
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/todo" /> : <Login />} />
          <Route path="/todo" element={isAuthenticated ? <ToDo /> : <Navigate to="/" />} />
        </Routes>
      </Router>
  
  );
}

export default App;
