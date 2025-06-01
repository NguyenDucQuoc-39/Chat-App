import {useEffect} from 'react';
import axios from 'axios';
import { serverUrl } from '../main.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers, setUserData} from '../redux/userSlice';

const getOtherUsers = () => {
    console.log("API /api/auth/others được gọi");
    let dispatch = useDispatch();
    let {userData} = useSelector(state => state.user);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/auth/others`, {
                    withCredentials: true
                });
                console.log("otherUsers data:", result.data);
                dispatch(setOtherUsers(result.data));
            } catch (error) {
                console.error(error);
            }

        }
        fetchUser();
    }, []);
}
export default getOtherUsers;