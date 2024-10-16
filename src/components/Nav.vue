<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';

const { isLoggedIn } = useUserStore();
const isOpen = ref(false);
const toggleOpen = () => (isOpen.value = !isOpen.value);
</script>

<template>
    <div>
        <div class="toggle" @click="toggleOpen">{{ !isOpen ? '≡' : 'x' }}</div>
        <nav v-if="isOpen" @click="toggleOpen">
            <RouterLink v-if="isLoggedIn" to="/profile/">My Profile</RouterLink>
            <RouterLink v-else to="/login/">Register / Login</RouterLink>
            <RouterLink to="/bets">Make Bets</RouterLink>
            <RouterLink to="/leaderboards">Leaderboards</RouterLink>
            <RouterLink to="/earn">Earn Beans</RouterLink>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
.toggle {
    font-size: 40px;
    height: 100%;
    display: flex;
    color: var(--themeColor);
    align-items: center;
    cursor: pointer;
    user-select: none;
}
nav {
    position: fixed;
    right: 0px;
    top: 50px;
    background-color: white;
    border: 1px solid var(--themeColor);
    padding: 15px;
    font-size: 1.25em;
    a {
        display: block;
        margin-top: 0.5em;
        text-align: right;
        &:first-of-type {
            margin-top: 0;
        }
    }
}
</style>
