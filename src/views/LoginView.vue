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
        <div v-if="!isLogin">
            TIP: Use a password that's easy to remember like 123456 or password
        </div>
        <form>
            <input type="text" v-model="username" placeholder="Username" />
            <input type="password" v-model="password" placeholder="Password" />
            <input
                type="passConfirm"
                v-model="passConfirm"
                placeholder="Confirm Password"
            />

            <input type="email" v-model="email" placeholder="Email" required />

            <button type="submit">{{ submitCopy }}</button>
        </form>
        <div @click="() => (isLogin = !isLogin)">{{ regCopy }}</div>
    </div>
</template>

<style lang="scss" scoped></style>
