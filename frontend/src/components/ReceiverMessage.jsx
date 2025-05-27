import React from 'react';
import gojo from "../assets/gojo.png"; 

function ReceiverMessage({ image, message }) {
    return (
          <div className="w-fit max-[500px] px-[20px] py-[10px] bg-black text-white text-[19px] rounded-2xl relative left-0  gap-[10px] flex flex-col">
                    {image && <img src={image} alt="" className='max-w-[250px] max-h-[250px] rounded-lg object-cover'/>}
            {message && <span>{message}</span> }
                </div>
    );
}

export default ReceiverMessage;