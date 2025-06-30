import axios from '../api/axiosClient';
import { setToken, removeToken } from '../auth/token';

export const login = async (phone, password) => {
    try {
        const res = await axios.post('/auth/login', { phone, password });
        // setToken(res.data.accessToken);
        return res.data;
    } catch (error) {
        console.error('Login failed:', error); // xử lý lỗi cụ thể
        throw error;
    }

};

export const registerByPhone = async (name, phone, password) => {
    try {
        const res = await axios.post('/auth/register', { phone, password, name });
        // setToken(res.data.accessToken);
        return res.data;
    } catch (error) {
        console.error('Register failed:', error); // xử lý lỗi cụ thể
        throw error;
    }
}

export const logout = async () => {
    try {
        await axios.post('/auth/logout')
    } catch (error) {
        console.error('Logout failed:', error); // xử lý lỗi cụ thể
        throw error;
    }
}

