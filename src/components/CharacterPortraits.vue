<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';

const { character, dir } = defineProps<{
    character: string;
    dir?: 'vert' | 'none';
}>();

const random = Math.floor(Math.random() * 10) + 5 + 'px';
const flipped = `-${random}`;
const extra = ref('');
let timeout: ReturnType<typeof setTimeout>;

//AI prompt
//a man with a normal, human body is wearing a suit and a king's crown with a kidney bean for a head. He has massive bloodshot eyes, no nose, a mouth mouth screaming with excitement, and bushy eyebrows. He's looking at a large sign that reads "bets closing soon" looking worried to miss his chance. He's running to the casino holding large amounts of cash. photo realistic

const toggleThunder = () => {
    clearTimeout(timeout);
    if (extra.value) extra.value = '';
    else extra.value = 'empty';
    timeout = setTimeout(toggleThunder, Math.floor(Math.random() * 95) + 5);
};

watch(
    () => character,
    newCharacter => {
        if (newCharacter === 'thor') toggleThunder();
        else {
            clearTimeout(timeout);
            extra.value = '';
        }
    },
    { immediate: true }
);

onUnmounted(() => clearTimeout(timeout));
</script>

<template>
    <div class="character" :class="[character]">
        <div class="bean" :class="[dir]">
            <img :src="`/assets/characters/${character}_fg.png`" />
        </div>
        <div class="bg">
            <img :src="`/assets/characters/${character}${extra}_bg.jpg`" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.character {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    pointer-events: none;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    &.king,
    &.crime {
        height: auto;
    }
    div {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        img {
            width: auto;
            height: 100%;
            position: absolute;
            z-index: -1;
        }
        &.bean {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            animation: mover 1ms infinite alternate linear;
            &.vert {
                animation: moverVert 1ms infinite alternate linear;
            }
            &.none {
                animation: none !important;
            }
            img {
                z-index: 1;
            }
        }
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
@keyframes moverVert {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(v-bind(random));
    }
}
</style>
