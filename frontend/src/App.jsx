import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import getCurrentUser from "./customHooks/getCurrentUser.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { useSelector } from "react-redux";
import getOtherUsers from "./customHooks/getOtherUsers.jsx";

function App() {
  getCurrentUser();
  getOtherUsers();
  let {userData} = useSelector(state => state.user);

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