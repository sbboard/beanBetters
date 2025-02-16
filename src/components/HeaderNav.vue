<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const isOpen = ref(false);
const toggleOpen = () => (isOpen.value = !isOpen.value);
</script>

<template>
    <div>
        <div class="toggle" @click="toggleOpen">{{ !isOpen ? '≡' : 'x' }}</div>
        <nav v-if="isOpen" @click="toggleOpen">
            <div>{{ useUserStore().username }}</div>
            <div>wins: 0</div>
            <hr />
            <RouterLink to="/bets">Make Bets</RouterLink>
            <!-- <RouterLink to="/leaderboards">Charts</RouterLink> -->
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
    top: 50px;
    margin-left: -115px;
    backdrop-filter: brightness(0.5) blur(5px);
    border: 1px solid var(--themeColor);
    padding: 15px;
    font-size: 1.25em;
    z-index: 100;
    text-align: center;
    a {
        display: block;
        margin-top: 0.5em;
        &:first-of-type {
            margin-top: 0;
        }
    }
}
</style>
