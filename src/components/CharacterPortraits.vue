<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const { character, dir } = defineProps<{
    character: string;
    dir?: 'vert' | 'none';
}>();

const userStore = useUserStore();
const random = Math.floor(Math.random() * 10) + 5 + 'px';
const flipped = `-${random}`;
const extra = ref('');
let timeout: ReturnType<typeof setTimeout>;
const hasEye = computed(() => userStore.checkItem('joes eye'));
const msg = ref('');

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

onMounted(() => {
    if (character.indexOf('thor') === 0) return;
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return (msg.value = 'kill me');
        case 1:
            return (msg.value = 'it hurts');
        case 2:
            return (msg.value = 'why');
        default:
            return;
    }
});

onUnmounted(() => clearTimeout(timeout));
</script>

<template>
    <div class="character" :class="[character, { joe: hasEye }]">
        <div class="msg" v-if="hasEye && msg.length > 0">"{{ msg }}"</div>
        <div class="bean" :class="[dir]">
            <img
                :src="`/assets/characters/${character}_fg${
                    hasEye ? '_nojoe' : ''
                }.png`"
            />
        </div>
        <div class="bg">
            <img
                :src="`/assets/characters/${character}${extra}_bg${
                    hasEye ? '_nojoe' : ''
                }.jpg`"
            />
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
            animation: mover 1s infinite alternate ease-in-out;
            img {
                animation: joeMover 1.75s infinite alternate ease-in-out;
                image-rendering: pixelated;
            }
            &.vert {
                animation: moverVert 1s infinite alternate ease-in-out;
                img {
                    animation: joeMoverVert 1.75s infinite alternate ease-in-out;
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
@keyframes joeMover {
    0% {
        transform: scaleY(1) scaleX(1.1) skewX(-1deg) skewY(0deg);
    }
    100% {
        transform: scaleY(1.1) scaleX(1) skewX(1deg) skewY(-1deg);
    }
}
@keyframes joeMoverVert {
    0% {
        transform: scaleX(1) scaleY(1.1) skewX(-5deg);
    }
    100% {
        transform: scaleX(1.1) scaleY(1) skewX(5deg);
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
