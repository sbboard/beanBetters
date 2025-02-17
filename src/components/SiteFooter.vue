<script setup lang="ts">
const images = Array.from({ length: 10 }, (_, i) => `${i}.gif`); //array containing the strings 0.gif to 9.gif
images.sort(() => Math.random() - 0.5);
</script>

<template>
    <footer>
        <span
            >&copy; {{ new Date().getFullYear() + 15 }} The United Nations of
            Gamblers</span
        >
        <div>
            <img
                :key="i"
                v-for="(image, i) in images"
                :src="`/assets/footer/${image}`"
            />
            <img
                :key="i"
                v-for="(image, i) in images"
                :src="`/assets/footer/${image}`"
            />
        </div>
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
        width: fit-content;
        position: absolute;
        z-index: 1;
        margin: 0 auto;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #00000080;
        backdrop-filter: blur(3px);
        padding: 5px;
        padding-bottom: 0;
    }
    & > div {
        text-align: left;
        position: absolute;
        top: 0;
        z-index: 0;
        left: 0;
        white-space: nowrap;
        animation: scroll 30s linear infinite;
        img {
            height: 50px;
        }
    }
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
</style>
