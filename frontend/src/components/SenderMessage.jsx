import React from 'react';
import gojo from "../assets/gojo.png"; // Assuming you have an image for the sender

function SenderMessage({ image, message }) {
    return (
        <div className="w-fit max-[500px] px-[20px] py-[10px] bg-black text-white text-[19px] rounded-2xl relative right-0 ml-auto gap-[10px] flex flex-col">
            {image && <img src={image} alt="" className='w-[30px] rounded-full'/>}
            {message && <span>{message}</span> }
            
        </div>
    );
}

export default SenderMessage;