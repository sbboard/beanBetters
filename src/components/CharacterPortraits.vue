<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';

const { character, dir } = defineProps<{
    character: string;
    dir?: 'vert' | 'none';
}>();

const random = Math.floor(Math.random() * 10) + 5 + 'px';
const flipped = `-${random}`;
const extra = ref('');
let timeout: ReturnType<typeof setTimeout>;
const hasEye = computed(() => false);

function msg(): string {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return 'kill me';
        case 1:
            return 'it hurts';
        case 2:
            return 'why';
        default:
            return '';
    }
}

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
    <div class="character" :class="[character, { joe: hasEye }]">
        <div class="msg" v-if="hasEye">"{{ msg() }}"</div>
        <div class="bean" :class="[dir]">
            <img
                :src="`/assets/characters/${character}_fg${
                    hasEye ? '_nojoe' : ''
                }.png`"
            />
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
    &.joe {
        .msg {
            position: absolute;
            bottom: 5%;
            z-index: 2;
            text-transform: uppercase;
            height: 1em;
            color: var(--themeColor);
            background-color: rgba(0, 0, 0, 0.5);
            font-family: 'Courier New', Courier, monospace;
            width: fit-content;
            left: 0;
            right: 0;
            display: block;
            margin: 0 auto;
            animation: fadeIn 60s infinite alternate linear;
        }
        div.bean {
            &.vert {
                animation: moverVert 1s infinite alternate linear;
                img {
                    animation: joeMoverVert 0.75s infinite alternate linear;
                    image-rendering: pixelated;
                }
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
@keyframes joeMoverVert {
    0% {
        transform: scaleX(1) scaleY(1.2) skewX(-5deg);
    }
    100% {
        transform: scaleX(1.2) scaleY(1) skewX(5deg);
    }
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
