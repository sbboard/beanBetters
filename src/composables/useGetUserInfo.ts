import axios from 'axios';

export const getUserInfo: (id: string) => Promise<User> = async (
    id: string
) => {
    try {
        const response = await axios.get(
            `https://www.gang-fight.com/api/beans/user/${id}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};
