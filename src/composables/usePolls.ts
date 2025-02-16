import axios from 'axios';

const api = 'https://www.gang-fight.com/api/beans';
export const getAllPolls: () => Promise<Poll[]> = async () => {
    try {
        const response = await axios.get(`${api}/polls`);
        console.log('Polls:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching polls:', error);
        throw error;
    }
};
