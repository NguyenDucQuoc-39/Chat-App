import {useEffect} from 'react';
import axios from 'axios';
import { serverUrl } from '../main.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import { useSelector } from 'react-redux';


const getCurrentUser = () => {
    let dispatch = useDispatch();
    let {userData} = useSelector(state => state.user);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/auth/current`, {
                    withCredentials: true
                });
                dispatch(setUserData(result.data));
            } catch (error) {
                console.error("Error fetching current user:", error);
            }

        }
        fetchUser();
    }, []);
}
export default getCurrentUser;