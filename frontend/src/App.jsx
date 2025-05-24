import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import getCurrentUser from "./customHooks/getCurrentUser";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

function App() {
  getCurrentUser();
  let {userData} = useSelector((state) => state.user);

  return (
   <Routes>
    <Route path='/login' element={!userData ? <Login /> : <Navigate to="/profile" /> } />
    <Route path='/signup' element={!userData ? <Signup /> : <Navigate to="/login" />} />
    <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
    <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />

   </Routes>
  )
}

export default App;