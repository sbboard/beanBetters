const SECRET_KEY = Number(import.meta.env.VITE_KEY) || 0;
import axios from 'axios';
import { useUserStore } from '../stores/user';
import { getUserInfo } from './useGetUserInfo';

const transformations: Record<number, (str: string) => string> = {
    1: str => str.split('').reverse().join(''),
    2: str =>
        str.slice(Math.floor(str.length / 2)) +
        str.slice(0, Math.floor(str.length / 2)),
    3: str => str.charAt(str.length - 1) + str.slice(0, -1),
    4: str =>
        str.slice(Math.floor(str.length / 2)) +
        str.slice(0, Math.floor(str.length / 2)),
    5: str => str.slice(1) + str.charAt(0),
    6: str => str + str,
    7: str =>
        str.slice(Math.floor(str.length / 2)) +
        str.slice(0, Math.floor(str.length / 2)),
    8: str => str.charAt(str.length - 1) + str.slice(0, -1),
    9: str => str.split('').reverse().join(''),
    0: str => str,
};

const reverseTransformations: Record<number, (str: string) => string> = {
    1: str => str.split('').reverse().join(''),
    2: str =>
        str.slice(-Math.floor(str.length / 2)) +
        str.slice(0, -Math.floor(str.length / 2)),
    3: str => str.slice(1) + str.charAt(0),
    4: str =>
        str.slice(Math.floor(str.length / 2)) +
        str.slice(0, Math.floor(str.length / 2)),
    5: str => str.charAt(str.length - 1) + str.slice(0, -1),
    6: str => str.slice(0, str.length / 2),
    7: str =>
        str.slice(Math.floor(str.length / 2)) +
        str.slice(0, Math.floor(str.length / 2)),
    8: str => str.slice(1) + str.charAt(0),
    9: str => str.split('').reverse().join(''),
    0: str => str,
};

function transformId(
    id: string,
    transformationsMap: Record<number, (str: string) => string>,
    isReverse: boolean
): string {
    const keyString = SECRET_KEY.toString();
    let transformedId = id;

    const startIdx = isReverse ? keyString.length - 1 : 0;
    const endIdx = isReverse ? -1 : keyString.length;
    const step = isReverse ? -1 : 1;

    for (let i = startIdx; i !== endIdx; i += step) {
        const key = parseInt(keyString[i]);
        const transformation = transformationsMap[key];
        if (typeof transformation === 'function') {
            transformedId = transformation(transformedId);
        }
    }
    return transformedId;
}

const scrambleId = (id: string) => transformId(id, transformations, false);
const unscrambleId = (scrambledId: string) =>
    transformId(scrambledId, reverseTransformations, true);

export async function readScrambledId(scrambledId: string) {
    const id = unscrambleId(scrambledId);
    try {
        setInfo(await getUserInfo(id));
    } catch (error) {
        console.error('Error fetching polls:', error);
        throw error;
    }
}

const updateLastIP = async (user: User, lastIP: string) => {
    try {
        await axios.put(
            `https://www.gang-fight.com/api/beans/user/${user._id}`,
            { lastIP }
        );
    } catch {
        //empty
    }
};

const getCurrentIP = async (lastIP?: string) => {
    try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        return response.data.ip;
    } catch {
        return lastIP;
    }
};

export async function setInfo(user: User) {
    const userStore = useUserStore();
    userStore.user = user;
    userStore.showLogin = false;

    const currentIP = await getCurrentIP(user.lastIP);
    if (user.lastIP !== currentIP) updateLastIP(user, currentIP);

    try {
        localStorage.setItem('bean_id', scrambleId(user._id));
    } catch (error) {
        console.error('Error setting bean_id:', error);
    }
}

export function useLogout() {
    const userStore = useUserStore();
    try {
        localStorage.removeItem('bean_id');
    } catch (error) {
        console.error('Error removing bean_id:', error);
    }
    userStore.resetUser();
}
