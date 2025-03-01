import axios from 'axios';

const api = import.meta.env.VITE_API;
export const getUserInfo: (id: string) => Promise<User> = async (
    id: string
) => {
    try {
        const response = await axios.get(`${api}/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};
