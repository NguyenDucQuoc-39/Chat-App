import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import gojo from "../assets/gojo.png";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./receiverMessage";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import { setMessages } from "../redux/messageSlice.js";
import { setOnlineUsers } from "../redux/userSlice.js";



function MessageArea() {
    let { selectedUser,userData, socket} = useSelector(state => state.user);
    let {messages} = useSelector(state => state.message);
    let dispatch = useDispatch();
    let [showPicker, setShowPicker] = useState(false);
    let [input,setInput] = useState("");
    let [frontendImage, setFrontendImage] = useState(null);
    let [backendImage, setBackendImage] = useState(null);
    let image = useRef();
    

    //Chọn ảnh
    const handleImage = (e) => {
        let file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }

    // Gửi tin nhắn
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(input.length ==0 && !backendImage) {
            return; // Không gửi tin nhắn nếu không có nội dung
        }

        try {
            let formData = new FormData();
            formData.append("message", input);
            if (backendImage) {
                formData.append("image", backendImage);
            }

            let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, {withCredentials: true});
            console.log("Message sent successfully:", result.data);

            dispatch(setMessages([...messages,result.data ])); // Cập nhật tin nhắn mới vào state

            // // Gửi tin nhắn đến người nhận qua socket
            // if (socket) {
            //     socket.emit("sendMessage", {
            //     recipientId: selectedUser._id,
            //     message: result.data, // hoặc message text + ảnh + user info
            //     });
            // }
            setInput("");
            setBackendImage(null);
            setFrontendImage(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    const onEmojiClick = (emojiData) => {
        setInput(prevInput => prevInput + emojiData.emoji)
        setShowPicker(false);
    }



    // Lấy tin nhắn khi người dùng chọn cuộc trò chuyện
   useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (mess) => {
      dispatch(setMessages([...messages, mess]));
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
    },[messages,setMessages]);

    return (
        <div className={`lg:w-[70%] relative ${selectedUser ? "flex" : "hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}>

            {selectedUser &&
                <div className="w-full h-[100vh] flex flex-col">
                    <div className='w-full h-[100px] bg-black rounded-b-[30px] shadow-gray-400 shadow-lg gap-[20px] flex items-center px-[20px]'>
                        <div className="cursor-pointer" onClick={() => dispatch(setSelectedUser(null))}>
                            <IoIosArrowRoundBack className='w-[40px] h-[40px] text-white' />
                        </div>
                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-lg cursor-pointer'>
                            <img src={selectedUser?.image || gojo} alt="" className='h-[100%]' />
                        </div>
                        <h1 className="text-white font-semibold text-[20px]">{selectedUser?.name || "user"}</h1>
                    </div>
                    <div className="w-full h-[80vh] flex flex-col py-[30px] px-[20px] overflow-auto gap-[10px]">

                        {showPicker && 
                        <div className='absolute bottom-[120px] left-[20px]'> <EmojiPicker width={250} height={350}  className="shadow-lg z-[100]" onEmojiClick={onEmojiClick} /> </div>}
                        
                        {messages && messages?.map((mess) => (
                            mess.sender === userData._id ? 
                                <SenderMessage image={mess.image} message={mess.message} />:
                                <ReceiverMessage image={mess.image} message={mess.message}  /> 

                        ))}
                    </div>
                </div>}

            {!selectedUser &&
                <div className='w-full h-full flex flex-col justify-center items-center '>
                    <h1 className="text-black font-bold text-[50px]">Chào mừng đến với Chat App</h1>
                    <span className="text-black font-semibold text-[30px]">Nhắn với bạn bè tại đây !</span>
                </div>}
            {selectedUser && <div className='w-full lg:w-[70%] h-[60px] fixed bottom-[20px] flex items-center justify-center'>

                <img src={frontendImage} alt="" className='w-[80px] absolute bottom-[100px] right-[20%] rounded-lg' />
                <form className='w-[95%] max-w[70%] h-[50px] bg-black shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px]' onSubmit={handleSendMessage}>
                    <div className='ml-[15px]' onClick={() => setShowPicker(prev => !prev)}>
                        <RiEmojiStickerLine className='w-[30px] h-[30px] text-white cursor-pointer ' />
                    </div>
                    <input type="file"  accept="image/*" hidden ref={image} onChange={handleImage} />
                    <input type="text" className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-white bg-transparent ' placeholder="Nhập tin nhắn..." onChange={(e) => setInput(e.target.value)} value={input}/>
                    <div className='mr-[10px]' onClick={() => image.current.click()}>
                        <FaImages className='w-[30px] h-[30px] text-white cursor-pointer' />
                    </div>
                    {input.length > 0 && !backendImage && (
                    <button className='mr-[10px]'>
                        <RiSendPlane2Fill className='w-[30px] h-[30px] text-white cursor-pointer' />
                    </button>)}
                </form>
            </div>}
        </div>
    )
}
export default MessageArea;