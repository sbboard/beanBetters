<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '../stores/user';

const registerTab = ref(false);
const forgotPassword = ref(false);
const SECRET = 'itsbeantime';
const code = ref('');

const gamblers = [
    'gambler1.jpg',
    'gambler2.jpg',
    'gambler3.jpg',
    'gambler4.jpg',
    'gambler5.jpg',
    'gambler6.jpg',
];
const currentGambler = ref('');

const getRandomGambler = () => {
    let newGambler;
    do {
        newGambler = `/assets/${
            gamblers[Math.floor(Math.random() * gamblers.length)]
        }`;
    } while (newGambler === currentGambler.value);
    return newGambler;
};

currentGambler.value = getRandomGambler();

const noMatch = computed(() => code.value !== SECRET);

const newUser = ref({
    name: '',
    password: '',
});

const loginCredentials = ref({
    name: '',
    password: '',
});

const loginError = ref<string | null>(null);

const api = 'https://www.gang-fight.com/api/beans';

function setInfo(id: string, name: string) {
    useUserStore().userId = id;
    useUserStore().username = name;
    try {
        localStorage.setItem('userId', id);
        localStorage.setItem('username', name);
    } catch (error) {
        console.error('Local storage error:', error);
    }
}

const registerUser = async () => {
    try {
        // Registering user with axios
        const response = await axios.post(
            `${api}/user/register`,
            newUser.value,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        if (response.data.user) {
            setInfo(response.data.user._id, response.data.user.name);
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
};

const loginUser = async () => {
    try {
        // Logging in user with axios
        const response = await axios.post(
            `${api}/user/login`,
            loginCredentials.value,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        if (response.data.user) {
            setInfo(response.data.user._id, response.data.user.name);
        }
    } catch (error) {
        loginError.value = 'Login failed.';
        console.error('Login error:', error);
    }
};

const swapTab = () => {
    registerTab.value = !registerTab.value;
    loginError.value = null;
    forgotPassword.value = false;
    currentGambler.value = getRandomGambler();
};

onMounted(() => {
    try {
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        if (userId && username) setInfo(userId, username);
    } catch (error) {
        console.error('Local storage error:', error);
    }
});
</script>

<template>
    <div class="login">
        <img :src="currentGambler" />
        <template v-if="registerTab">
            <h1>Register As an official big bean Gambler $$</h1>
            <form @submit.prevent="registerUser">
                <input v-model="newUser.name" placeholder="Name" required />
                <input
                    type="password"
                    v-model="newUser.password"
                    placeholder="Password"
                    required
                />
                <input placeholder="Registration Code" v-model="code" />
                <button type="submit" :disabled="noMatch">
                    REGISTER!! WIN BIG!
                </button>
            </form>
        </template>

        <template v-else>
            <h1>Login To Continue Your Gambling Journey $$</h1>
            <form @submit.prevent="loginUser">
                <input
                    v-model="loginCredentials.name"
                    placeholder="Name"
                    required
                />
                <input
                    type="password"
                    v-model="loginCredentials.password"
                    placeholder="Password"
                    required
                />
                <button type="submit">LOGIN TO WIN!</button>
                <div
                    class="forgot"
                    v-if="!forgotPassword"
                    @click="forgotPassword = true"
                >
                    Forgot Password?
                </div>
                <div class="tooBad" v-else>TOO BAD STUPID!</div>
            </form>

            <div v-if="loginError" class="error">
                <p>{{ loginError }}</p>
            </div>
        </template>
        <div class="swap" @click="swapTab">
            {{
                registerTab
                    ? 'Log in to an Existing Account'
                    : 'Create a New Account'
            }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: inherit;
    width: fit-content;
    margin: 0 auto;
    width: 400px;
    img {
        width: 90%;
        aspect-ratio: 1;
        margin-bottom: 1em;
        border-radius: 10px;
    }
    input {
        display: block;
    }
    .forgot {
        font-size: 0.75em;
        text-align: center;
        margin: 0.5em 0 0.75em;
        cursor: pointer;
    }
    .tooBad {
        @extend .forgot;
        pointer-events: none;
        animation: fadeOut 1s forwards;
        animation-delay: 2000ms;
    }
    h1 {
        margin-bottom: 1rem;
        font-size: 1.3em;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
    }
    form {
        width: 100%;
        input,
        button {
            margin-bottom: 0.5em;
            width: 100%;
            box-sizing: border-box;
        }
        button {
            outline: 0;
            border: 0;
            padding: 0.5em;
            background-color: var(--themeColor);
            cursor: pointer;
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
    .swap {
        cursor: pointer;
        color: var(--themeColor);
        user-select: none;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
