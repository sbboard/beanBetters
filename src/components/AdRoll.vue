<script setup lang="ts">
const images = Array.from({ length: 42 }, (_, i) => `${i}.gif`); //array containing the strings 0.gif to 9.gif
images.sort(() => Math.random() - 0.5);
//trim the array to 10 images
images.length = 10;

const { alt } = defineProps<{
    alt?: boolean;
}>();
</script>

<template>
    <div :class="{ alt }">
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
</template>

<style lang="scss" scoped>
div {
    text-align: left;
    position: absolute;
    top: 0;
    z-index: 0;
    left: 0;
    white-space: nowrap;
    animation: scroll 30s linear infinite;
    display: inline;
    backdrop-filter: none;
    margin: unset;
    max-width: none;
    img {
        height: 50px;
    }
    &.alt {
        animation: scroll 30s linear infinite reverse;
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
