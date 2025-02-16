<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '../stores/user';

const registerTab = ref(false);
const forgotPassword = ref(false);

const newUser = ref({
    name: '',
    password: '',
});

const loginCredentials = ref({
    name: '',
    password: '',
});

const loginError = ref<string | null>(null);

// Set your API endpoint URL for the external server
const api = 'https://www.gang-fight.com/api/beans';

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
            useUserStore().userId = response.data.user._id;
            useUserStore().username = response.data.user.name;
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
        if (response.data.userId) {
            useUserStore().userId = response.data.userId;
            useUserStore().username = loginCredentials.value.name;
        }
    } catch (error) {
        loginError.value = 'Login failed.';
        console.error('Login error:', error);
    }
};
</script>

<template>
    <div>
        <template v-if="registerTab">
            <h1>Register As a Gambler</h1>
            <form @submit.prevent="registerUser">
                <input v-model="newUser.name" placeholder="Name" required />
                <input
                    type="password"
                    v-model="newUser.password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </template>
        <template v-else>
            <h1>Login To Continue Your Gambling Journey</h1>
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
                <button type="submit">Login</button>
                <div v-if="!forgotPassword" @click="forgotPassword = true">
                    Forgot Password?
                </div>
                <div class="tooBad" v-else>Too bad idiot!</div>
            </form>

            <div v-if="loginError" class="error">
                <p>{{ loginError }}</p>
            </div>
        </template>
        <div @click="registerTab = !registerTab">
            {{
                registerTab
                    ? 'Log in to an Existing Account'
                    : 'Create a New Account'
            }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tooBad {
    pointer-events: none;
    animation: fadeOut 1s forwards;
    animation-delay: 2000ms;
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
