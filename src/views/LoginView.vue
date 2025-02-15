<script lang="ts" setup>
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';

const newUser = ref({
    name: '',
    password: '',
});

const loginCredentials = ref({
    name: '',
    password: '',
});

const userInfo = ref<any>(null); // Using any for the response type
const loginError = ref<string | null>(null);

const api = import.meta.env.VITE_API;
const registerUser = async () => {
    const { data, error } = await useFetch(`${api}/user/register`, {
        method: 'POST',
        body: JSON.stringify(newUser.value),
        headers: { 'Content-Type': 'application/json' },
    }).json();

    console.log('Register Data:', data);
    console.log('Register Error:', error);

    if (error) {
        console.error('Registration error:', error);
    } else {
        console.log('Registration successful:', data);
    }
};

const loginUser = async () => {
    const { data, error } = await useFetch(`${api}/user/login`, {
        method: 'POST',
        body: JSON.stringify(loginCredentials.value),
        headers: { 'Content-Type': 'application/json' },
    }).json();

    console.log('Login Data:', data);
    console.log('Login Error:', error);

    if (error) {
        loginError.value = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
    } else {
        userInfo.value = data;
        console.log('Login successful:', data);
    }
};
</script>

<template>
    <div>
        <h1>Register</h1>
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

        <h1>Login</h1>
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
        </form>

        <div v-if="userInfo">
            <p>Welcome, {{ userInfo.name }}!</p>
        </div>
        <div v-if="loginError" class="error">
            <p>{{ loginError }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.alert {
    border: 1px solid var(--themeColor);
    padding: 1em;
    margin-bottom: 1em;
    b {
        font-weight: bold;
    }
}
.swap {
    cursor: pointer;
    color: var(--themeColor);
    text-decoration: underline;
    text-align: center;
}

form {
    margin: 0 auto;
    width: 100%;
    input {
        display: block;
        width: 100%;
        margin-bottom: 0.5em;
        box-sizing: border-box;
    }
    margin-bottom: 1em;
}
</style>
