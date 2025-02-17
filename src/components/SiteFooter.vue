<script setup lang="ts">
import AdRoll from './AdRoll.vue';

const images = Array.from({ length: 10 }, (_, i) => `${i}.gif`); //array containing the strings 0.gif to 9.gif
images.sort(() => Math.random() - 0.5);
</script>

<template>
    <footer>
        <span
            >&copy; {{ new Date().getFullYear() + 15 }} The United Nations of
            Soda Enjoyers</span
        >
        <AdRoll />
    </footer>
</template>

<style lang="scss">
footer {
    position: relative;
    height: 50px;
    text-align: right;
    color: var(--themeColor);
    font-size: 10px;
    overflow: hidden;
    span {
        max-width: 990px;
        position: absolute;
        z-index: 1;
        margin: 0 auto;
        height: 40px;
        bottom: 0;
        left: 0;
        right: 0;
        backdrop-filter: brightness(0.5) blur(5px);
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: end;
    }
}
</style>
