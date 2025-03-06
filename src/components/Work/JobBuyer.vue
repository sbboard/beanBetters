<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const buyers = ['1.png', '2.png', '3.png', '4.png', '5.png'];
const videos = [
    '96CznfZremI',
    '4Bs6QaJJ9Xk',
    '-oe8NyTA74E',
    'O3qGGk5ymQ4',
    'vmCuvph6bs4',
    'qFpyYFtoMao',
    'a-MG7qy1brw',
    'MLpGpWV8JYQ',
    'WojIv-PVYm8',
    'MsqslIVEmLY',
    'kOZl6j-BPVw',
    's_76M4c4LTo',
];
const buyer = ref('');
const currentVideo = ref('');

const getRandomEntry = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const text =
    'Finally someone showed up. Add our watermark to the top left corner. Keep it small! Also we need text telling people about the site. Make it look good! Also add a banner add to the side. The people need this rip and they need is NOW!';
const shownText = ref('');
const isOpen = computed(() => {
    if (shownText.value.length === 0) return false;
    return shownText.value[shownText.value.length - 1].match(/[aeikorstuwy]/i);
});

const nextLetter = () => {
    shownText.value = text.slice(0, shownText.value.length + 1);
    if (shownText.value.length >= text.length) return;
    setTimeout(nextLetter, 20);
};

onMounted(() => {
    buyer.value = getRandomEntry(buyers);
    currentVideo.value = getRandomEntry(videos);
    nextLetter();
});
</script>

<template>
    <div>
        <div class="portrait">
            <img
                class="buyer"
                :class="{ open: isOpen }"
                :src="`/assets/buyers/${buyer}`"
            />
            <img src="/assets/buyers/bg.jpg" />
        </div>
        <div>{{ shownText }}</div>
        <div class="video">
            <div class="ad">
                راهن الآن على المراهنين الكبار!راهن الآن على المراهنين
                الكبار!راهن الآن على المراهنين الكبار!
            </div>
            <img
                class="watermark"
                src="http://localhost:3000/assets/characters/king_fg.png"
            />
            <iframe
                v-if="currentVideo"
                :src="`https://www.youtube-nocookie.com/embed/${currentVideo}?version=3&controls=0&showinfo=0&autoplay=1&mute=1&loop=1&hl=en&playlist=${currentVideo}`"
            >
            </iframe>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.portrait {
    position: relative;
    width: 250px;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
        &.buyer {
            width: 200%;
            position: absolute;
            transform: translateX(-50%);
            &.open {
                transform: translateX(0%);
            }
        }
    }
}

.video {
    width: 500px;
    border: 1px solid var(--themeColor);
    position: relative;
    pointer-events: none;
    .watermark {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: auto;
        z-index: 1;
        opacity: 0.5;
    }
    iframe {
        pointer-events: none;
        width: 100%;
        aspect-ratio: 4/3;
    }
    .ad {
        color: var(--themeColor);
        text-align: center;
        font-size: 1.75em;
        position: absolute;
        bottom: 0;
        background: linear-gradient(
            to bottom,
            rgb(0, 0, 0, 0) 5%,
            rgb(0, 0, 0, 1) 50%
        );
        padding-top: 2em;
    }
}
</style>
