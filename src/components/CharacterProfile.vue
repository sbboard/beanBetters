<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
    character: string;
}>();

const img = computed(() => {
    switch (props.character) {
        case 'king':
            return '/assets/king.png';
        default:
            return '/assets/logo.jpg';
    }
});

const leftEye = ref({ x: 0, y: 0 });
const rightEye = ref({ x: 0, y: 0 });

let interval: ReturnType<typeof setInterval>;

const updateEye = () => {
    const RNG = 25;
    leftEye.value.x = Math.floor(Math.random() * RNG) - RNG / 2;
    leftEye.value.y = Math.floor(Math.random() * RNG) - RNG / 2;
    rightEye.value.x = Math.floor(Math.random() * RNG) - RNG / 2;
    rightEye.value.y = Math.floor(Math.random() * RNG) - RNG / 2;
};

onMounted(() => {
    interval = setInterval(updateEye, 25);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <div class="character">
        <img :src="img" />
        <div class="eye">
            <div
                class="iris"
                :style="{
                    transform: `translateY(${leftEye.y}px) translateX(${leftEye.x}px)`,
                }"
            >
                <div class="pupil"><div class="glow"></div></div>
            </div>
        </div>
        <div class="eye">
            <div
                class="iris"
                :style="{
                    transform: `translateY(${rightEye.y}px) translateX(${rightEye.x}px)`,
                }"
            >
                <div class="pupil"><div class="glow"></div></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
button {
    margin: 0 auto;
    display: block;
    margin-top: 0.5em;
}
.character {
    position: relative;
    max-width: 100%;
    width: 400px;
    margin: 0 auto;
    margin-bottom: 0.5em;
    img {
        max-width: 100%;
        z-index: 2;
        position: relative;
    }
    .eye {
        background: radial-gradient(circle, #ebf2ed 50%, #ac1e0b 70%);
        border-radius: 100%;
        width: 20%;
        padding-bottom: 20%;
        position: absolute;
        transform: rotate(-15deg);
        top: 26%;
        left: 30%;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-of-type(2) {
            right: 26%;
            top: 22%;
            width: 20%;
            padding-bottom: 20%;
            height: 0;
            left: auto;
        }
        .iris {
            background: radial-gradient(circle, #73c6cb 50%, #16518d 70%);
            border-radius: 100%;
            width: 60%;
            height: 0;
            padding-bottom: 60%;
            position: absolute;
            margin: auto;
            inset: 0;
            transition: all 50ms ease-in;
            .pupil {
                background-color: black;
                border-radius: 100%;
                width: 50%;
                padding-bottom: 50%;
                position: absolute;
                margin: auto;
                inset: 0;
                height: 0;
                .glow {
                    background: radial-gradient(
                        circle,
                        white 50%,
                        transparent 70%
                    );
                    border-radius: 100%;
                    width: 50%;
                    padding-bottom: 50%;
                    position: absolute;
                    margin: auto;
                    inset: 0;
                    height: 0;
                }
            }
        }
    }
}
</style>
