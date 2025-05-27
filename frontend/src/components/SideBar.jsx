import React from "react";
import { useSelector } from "react-redux";
import gojo from "../assets/gojo.png";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import { setOtherUsers, setUserData, setSelectedUser } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";



function SideBar() {
    let { userData, otherUsers, selectedUser } = useSelector(state => state.user);
    let [search, setSearch] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, {
                withCredentials: true
            });
            dispatch(setUserData(null));
            dispatch(setOtherUsers(null));
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }
    return (
        <div className={`lg:w-[30%] w-full h-full lg:block bg-slate-200 ${!selectedUser ? "block" : "hidden"} `}>
            <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-black shadow-gray-500 text-white cursor-pointer shadow-lg fixed bottom-[20px] left-[10px]' onClick={handleLogout}>
                <BiLogOutCircle className='w-[25px] h-[25px]' />
            </div>
            <div className='w-full h-[300px] bg-black rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
                <h1 className="text-white font-bold text-[25px]">Chat App</h1>
                <div className="w-full flex justify-between items-center text-white">
                    <h1 className="text-white font-bold text-[25px]">Hii, {userData.name || "user"}</h1>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-white shadow-lg cursor-pointer' onClick={() => navigate("/profile")}>
                        <img src={userData.image || gojo} alt="" className='h-[100%]' />
                    </div>
                </div>
                <div className="w-full flex items-center gap-[20px] ">
                    {!search && <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg' onClick={() => setSearch(true)}>
                        <IoIosSearch className='w-[25px] h-[25px]' />
                    </div>}

                    {search &&
                        <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex justify-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]'>
                            <IoIosSearch className='w-[25px] h-[25px]' />
                            <input type="text" placeholder='Tìm người dùng..' className='w-full h-full p-[10px] text-[17px] outline-0 border-0' />
                            <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={() => setSearch(false)} />
                        </form>
                    }
                    {!search && otherUsers?.map((user) => (
                        <div className='w-[60px] h-[60px]  rounded-full overflow-hidden flex justify-center items-center bg-white  shadow-gray-500 shadow-lg'>
                            <img src={user.image || gojo} alt="" className='h-[100%]' />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full h-[60px] overflow flex flex-col gap-[20px] items-center mt-[20px]"> 
                {otherUsers?.map((user) => (
                    <div className="w-[95%] h-[60px] flex  items-center gap-[20px] bg-white shadow-gray-500 shadow-lg rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => dispatch(setSelectedUser(user))}>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg'>
                        <img src={user.image || gojo} alt="" className='h-[100%]' />
                    </div>
                    <h1 className="text-black font-semibold text-[20px]">{user.name || user.userName}</h1>
                    </div>
                ))}
             </div>
        </div>
        
    )
}
export default SideBar;