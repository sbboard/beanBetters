<script setup lang="ts">
import AdRoll from './AdRoll.vue';
</script>

<template>
    <footer>
        <span
            >&copy; {{ new Date().getFullYear() + 15 }} The United Nations of
            Soda Enjoyers</span
        >
        <AdRoll :alt="true" />
    </footer>
</template>

<style lang="scss">
footer {
    position: relative;
    height: 50px;
    text-align: right;
    color: var(--themeColor);
    font-size: 0.75em;
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
        backdrop-filter: brightness(0.75) blur(5px);
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: end;
    }
}
</style>
