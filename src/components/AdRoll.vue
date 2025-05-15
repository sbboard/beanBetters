<script setup lang="ts">
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const images = Array.from({ length: 99 }, (_, i) => `${i}.gif`);
images.sort(() => Math.random() - 0.5);
images.length = 10; //trim the array to 10 images

const { alt } = defineProps<{ alt?: boolean }>();
</script>

<template>
    <div :class="{ alt }" v-if="!userStore.checkItem('adblock')">
        <img
            :key="`${i}a`"
            v-for="(image, i) in images"
            :src="`/assets/footer/${image}`"
        />
        <img
            :key="`${i}b`"
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
    animation: scroll 30s linear infinite reverse;
    display: inline;
    backdrop-filter: none;
    margin: unset;
    max-width: none;
    img {
        height: 50px;
    }
    &.alt {
        animation: scroll 30s linear infinite;
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
