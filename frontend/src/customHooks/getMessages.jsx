import {useEffect} from 'react';
import axios from 'axios';
import { serverUrl } from '../main.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers, setUserData} from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice.js';



const getMessages = () => {
    console.log("API /api/message/getMessages được gọi");
    let dispatch = useDispatch();
    let {userData, selectedUser} = useSelector(state => state.user);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, {
                    withCredentials: true
                });
                console.log("Messages data:", result.data);
                dispatch(setMessages(result.data));
            } catch (error) {
                console.error(error);
            }

        }
        fetchMessages();
    }, [selectedUser, userData]);
}
export default getMessages;