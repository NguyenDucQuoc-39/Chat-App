import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


function Login() {
    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");
    let dispatch = useDispatch();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email, password
            }, { withCredentials: true });
            dispatch(setUserData(result.data));
            navigate("/");
            setEmail("");
            setPassword("");
            setLoading(false);
        } catch (error) {
            console.error("Error during login:", error);
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return (
        <div className='w-full h-[100vh] bg-slate-200 flex justify-center items-center'>
            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
                <div className='w-full h-[200px] bg-black rounded-b-[30%] shadow-gray-400 shadow-lg flex justify-center items-center'>
                    <h1 className='text-white font-bold text-[30px]'>Login To <span className="text-red-600">Chat-App</span></h1>
                </div>
                <form className="w-full flex flex-col gap-[20px] items-center mt-[20px]" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" className="w-[90%] h-[50px] outline-none border-2 border-[#000000] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]" onChange={(e) => setEmail(e.target.value)} value={email} />

                    <div className=" relative w-[90%] h-[50px] border-2 border-[#000000] overflow-hidden rounded-lg shadow-gray-200 shadow-lg">
                        <input type={`${show ? "text" : "password"}`} placeholder="Password" className="w-full h-full outline-none px-[20px] py-[10px] bg-white shadow-gray-200 shadow-lg text-gray-700 text-[19px]" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <span className='absolute top-[10px] right-[20px] text-[19px] text-black font-semibold cursor-pointer' onClick={() => setShow(prev => !prev)}> {show ? <FaEyeSlash /> : <FaEye />} </span>
                    </div>

{error && <p className="text-red-600">{"*" + error}</p>}

                    <button className="px-[20px] py-[10px] bg-black text-white rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner" >{loading?"Loading...":"Login"}</button>
                    <p className="cursor-pointer" onClick={() => navigate("/signup")}>Want to create a new account？<span className="text-red-600 font-bold">Sign up</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login;