<script setup lang="ts">
const { character } = defineProps<{ character: string }>();

const random = Math.floor(Math.random() * 10) + 1 + 'px';
const flipped = `-${random}`;
</script>

<template>
    <div class="character">
        <img class="bean" :src="`/assets/characters/${character}_fg.png`" />
        <img :src="`/assets/characters/${character}_bg.jpg`" />
    </div>
</template>

<style lang="scss" scoped>
.character {
    position: relative;
    pointer-events: none;
    img {
        max-width: 100%;
    }
    .bean {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        animation: mover 1ms infinite alternate linear;
    }
}

@keyframes mover {
    0% {
        transform: translateX(v-bind(random));
    }
    100% {
        transform: translateX(v-bind(flipped));
    }
}
</style>
