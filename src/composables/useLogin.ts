import axios from 'axios';
import { useUserStore } from '../stores/user';
const api = import.meta.env.VITE_API;

const getCurrentIP = async (lastIP?: string) => {
    try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        return response.data.ip;
    } catch {
        return lastIP;
    }
};

export async function checkBeanId(id: string, key: string) {
    try {
        const response = await axios.get(`${api}/user/${id}/${key}`); // Pass key in URL
        if (response) setInfo(response.data, key);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Error fetching user info:',
                error.response?.data || error.message
            );
            return null;
        }
        console.error('Unexpected error:', error);
        return null;
    }
}

export async function setInfo(user: User, key: string) {
    const userStore = useUserStore();
    userStore.user = user;
    userStore.key = key;
    userStore.showLogin = false;

    const currentIP = await getCurrentIP(user.lastIP);
    if (user.lastIP !== currentIP) {
        try {
            await axios.put(`${api}/user/${user._id}`, { lastIP: currentIP });
        } catch {
            //empty
        }
    }

    try {
        localStorage.setItem('bean_id', user._id);
        localStorage.setItem('bean_key', key);
    } catch (error) {
        console.error('Error setting bean_id:', error);
    }
}

export function useLogout() {
    const userStore = useUserStore();
    try {
        localStorage.removeItem('bean_id');
        localStorage.removeItem('bean_key');
    } catch (error) {
        console.error('Error removing bean_id:', error);
    }
    userStore.resetUser();
}
