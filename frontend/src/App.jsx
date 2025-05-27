import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import getCurrentUser from "./customHooks/getCurrentUser.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { useSelector } from "react-redux";
import getOtherUsers from "./customHooks/getOtherUsers.jsx";
import { io } from "socket.io-client";
import { serverUrl } from "./main.jsx";
import { useDispatch } from "react-redux";
import { setSocket } from "./redux/userSlice.js";
import { setOnlineUsers } from "./redux/userSlice.js";

function App() {
  getCurrentUser();
  getOtherUsers();
  let { userData, socket, onlineUsers } = useSelector(state => state.user);
  let dispatch = useDispatch();


  useEffect(() => {
    if (userData) {
      const socketio = io(`${serverUrl}`, {
        query: {
          userId: userData?._id
        },
      })
      dispatch(setSocket(socketio));

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      })

    return () => socketio.close();

  } else {
    if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
   }
  }, [userData]);

  return (
    <Routes>
      <Route path='/login' element={!userData ? <Login /> : <Navigate to="/profile" />} />
      <Route path='/signup' element={!userData ? <Signup /> : <Navigate to="/login" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />

    </Routes>
  )
}

export default App;