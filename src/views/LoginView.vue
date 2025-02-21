<script lang="ts" setup>
import { computed, ref } from 'vue';
import axios from 'axios';
import { setInfo } from '@/composables/useLogin';

const api = 'https://www.gang-fight.com/api/beans';

const registerTab = ref(false);
const forgotPassword = ref(false);
const SECRET = 'itsbeantime';
const code = ref('');
const newUser = ref({ name: '', password: '' });
const loginCredentials = ref({ name: '', password: '' });
const loginError = ref<string | null>(null);

const noMatch = computed(() => code.value !== SECRET);

const registerUser = async () => {
    try {
        // Registering user with axios
        const response = await axios.post(
            `${api}/user/register`,
            newUser.value,
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data.user) setInfo(response.data.user);
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
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data.user) setInfo(response.data.user);
    } catch (error) {
        loginError.value = 'Login failed.';
        console.error('Login error:', error);
    }
};

const swapTab = () => {
    registerTab.value = !registerTab.value;
    loginError.value = null;
    forgotPassword.value = false;
};
</script>

<template>
    <div class="login">
        <template v-if="registerTab">
            <h1>Register As an official big bean bettor</h1>
            <form @submit.prevent="registerUser">
                <input
                    v-model="newUser.name"
                    maxlength="15"
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    v-model="newUser.password"
                    placeholder="Password"
                    required
                />
                <p>TIP: Use a password that's easy to remember like '123456'</p>
                <input placeholder="Invite Code" v-model="code" />
                <button type="submit" :disabled="noMatch">
                    REGISTER!! WIN BIG!
                </button>
            </form>
        </template>

        <template v-else>
            <h1>Login To Continue Your Betting Journey</h1>
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
    max-width: 100%;
    flex: 1;
    p {
        font-size: 0.8em;
        text-align: left;
        margin-bottom: 1em;
    }
    img {
        width: 90%;
        max-width: 100%;
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
