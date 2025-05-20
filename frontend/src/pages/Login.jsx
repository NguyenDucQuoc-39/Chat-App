import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    let navigate = useNavigate();
    let [show, setshow] = useState(false);
    return (
        <div className='w-full h-[100vh] bg-slate-200 flex justify-center items-center'>
            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
                <div className='w-full h-[200px] bg-black rounded-b-[30%] shadow-gray-400 shadow-lg flex justify-center items-center'>
                    <h1 className='text-white font-bold text-[35px]'>登录 <span className="text-red-600">Chat-App</span></h1>
                </div>
                <form className="w-full flex flex-col gap-[20px] items-center mt-[20px]">


                    <input type="email" placeholder="邮箱" className="w-[90%] h-[50px] outline-none border-2 border-[#000000] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]" />

                    <div className=" relative w-[90%] h-[50px] border-2 border-[#000000] overflow-hidden rounded-lg shadow-gray-200 shadow-lg">
                        <input type={`${show ? "text" : "password"}`} placeholder="密码" className="w-full h-full outline-none px-[20px] py-[10px] bg-white shadow-gray-200 shadow-lg text-gray-700 text-[19px]" />
                        <span className='absolute top-[10px] right-[20px] text-[19px] text-black font-semibold cursor-pointer' onClick={() => setshow(prev => !prev)}> {show ? <FaEyeSlash /> : <FaEye />} </span>
                    </div>

                    <button className="px-[20px] py-[10px] bg-black text-white rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner" >登录</button>
                    <p className="cursor-pointer" onClick={() => navigate("/signup")}>还没有账号？<span className="text-red-600 font-bold">去注册</span></p>
                </form>
            </div>


        </div>
    )
}

export default Login;