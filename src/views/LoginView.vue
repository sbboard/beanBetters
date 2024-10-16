<script setup lang="ts">
import { computed, ref } from 'vue';

const isLogin = ref(true);
const username = ref('');
const password = ref('');
const passConfirm = ref('');
const email = ref('');

const submitCopy = computed(() => (isLogin.value ? 'Login' : 'Register'));

const regCopy = computed(() =>
    isLogin.value
        ? "Don't Have An Account? Register"
        : 'Already Have An Account? Login'
);
</script>

<template>
    <div class="login">
        <div class="alert" v-if="!isLogin">
            <b>TIP:</b> Use a password that's easy to remember like 123456 or
            password
        </div>
        <form>
            <label for="username">Username</label>
            <input type="text" v-model="username" placeholder="Username" />
            <label for="password">Password</label>
            <input type="password" v-model="password" placeholder="Password" />
            <template v-if="!isLogin">
                <label for="passConfirm">Confirm Password</label>
                <input
                    type="passConfirm"
                    v-model="passConfirm"
                    placeholder="Confirm Password"
                />

                <label for="email">Email</label>
                <input
                    type="email"
                    v-model="email"
                    placeholder="Email"
                    required
                />
            </template>

            <button type="submit">{{ submitCopy }}</button>
        </form>
        <div class="swap" @click="() => (isLogin = !isLogin)">
            {{ regCopy }}
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
