import React from 'react';
import gojo from "../assets/gojo.png";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function ReceiverMessage({ image, message }) {
    let scroll = useRef();
    let { selectedUser } = useSelector(state => state.user);
    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message, image]);

    const handleImageScroll = (e) => {
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
    return (

        <div className="flex items-start gap-[20px]" >
             <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-black shadow-black shadow-lg cursor-pointer' >
                <img src={selectedUser.image || gojo} alt="" className='h-[100%]' />
            </div>
            <div ref={scroll} className="w-fit max-[500px] px-[20px] py-[10px] bg-black text-white text-[19px] rounded-2xl relative left-0 gap-[10px] flex flex-col">
                {image && <img src={image} alt="" className='max-w-[250px] max-h-[250px] rounded-lg object-cover' onLoad={handleImageScroll} />}
                {message && <span >{message}</span>}
            </div>
           
        </div>
    );
}

export default ReceiverMessage;