import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Report from "./pages/Report";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

// 🔐 Protected Route (UPDATED)
const ProtectedRoute = ({ children, allowedRole }) => {

  const role = localStorage.getItem("role"); // 🔥 moved here

  if (!role) {
    return <Navigate to="/" />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

return(

<Router>

{/* 🔔 Toast Notifications */}
<ToastContainer position="top-right" autoClose={2000} />

<Routes>

{/* Public */}
<Route path="/" element={<Login/>}/>

{/* Admin Routes */}
<Route path="/dashboard" element={
  <ProtectedRoute allowedRole="admin">
    <Dashboard/>
  </ProtectedRoute>
}/>

<Route path="/students" element={
  <ProtectedRoute allowedRole="admin">
    <Students/>
  </ProtectedRoute>
}/>

<Route path="/attendance" element={
  <ProtectedRoute allowedRole="admin">
    <Attendance/>
  </ProtectedRoute>
}/>

{/* Student + Admin */}
<Route path="/report" element={
  <ProtectedRoute>
    <Report/>
  </ProtectedRoute>
}/>

{/* Default redirect */}
<Route path="*" element={<Navigate to="/" />} />

</Routes>

</Router>

);

}

export default App;