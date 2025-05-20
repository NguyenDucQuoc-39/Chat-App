import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  console.log("App rendered!");
  return (
   <Routes>
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />
     <Route path='/' element={<Navigate to="/login" />} />
   </Routes>
  )
}

export default App;