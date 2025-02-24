<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const getNumber = () => Math.floor(Math.random() * 16) + 1;
const random = ref(getNumber());
const closed = ref(true);
const top = ref('0%');
const left = ref('0%');

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

let timeoutId: ReturnType<typeof setTimeout> | null = null;

function showAd() {
    closed.value = false;
    random.value = getNumber();
    top.value = Math.floor(Math.random() * 60) + 5 + '%';
    left.value = Math.floor(Math.random() * 70) + 5 + '%';
}

function closeAd() {
    closed.value = true;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(
        () => showAd(),
        Math.floor(Math.random() * 300000) + 30000
    );
}

let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

function dragMouseDown(e: MouseEvent) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
}

function elementDrag(e: MouseEvent) {
    e.preventDefault();
    const elmnt = document.querySelector('.ad') as HTMLElement;

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    const newTop = elmnt.offsetTop - pos2;
    const newLeft = elmnt.offsetLeft - pos1;

    top.value = (newTop / window.innerHeight) * 100 + '%';
    left.value = (newLeft / window.innerWidth) * 100 + '%';
}

function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
}

onMounted(() => {
    if (isMobile()) return;
    timeoutId = setTimeout(() => showAd(), 5000);
});

onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
});
</script>

<template>
    <div class="ad" v-if="!closed">
        <div class="header" @mousedown="dragMouseDown">
            <span>SODA ENJOYER GRANT FUNDED BY</span
            ><span @click="closeAd" class="close">x</span>
        </div>
        <img :src="`/assets/popups/${random}.jpg`" />
    </div>
</template>

<style lang="scss" scoped>
.ad {
    position: fixed;
    z-index: 500000;
    border: 1px solid var(--themeColor);
    box-sizing: border-box;
    line-height: 0;
    top: v-bind(top);
    left: v-bind(left);
    .header {
        height: 1em;
        width: 100%;
        display: block;
        backdrop-filter: brightness(0.5) blur(3px);
        border-bottom: 1px solid var(--themeColor);
        line-height: 1;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            display: block;
            color: var(--themeColor);
            font-size: 0.8em;
            margin-left: 0.25em;
            &.close {
                border-left: 1px solid var(--themeColor);
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1em;
                margin-left: auto;
                font-size: 1rem;
            }
        }
    }
    img {
        image-rendering: pixelated;
        max-width: 300px;
    }
}
</style>
