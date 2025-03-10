<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const NUMBER_OF_IMAGES = 11;
const getNumber = () => Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1;
const random = ref(getNumber());

onMounted(() => {
    random.value = getNumber();
});
</script>

<template>
    <div class="ad">
        <div class="header">
            <span
                >SPONSORED CONTENT HELPS SUPPORT THE SODA ENJOYER SEED
                FUND</span
            >
        </div>
        <img :src="`/assets/popups/${random}.jpg`" />
    </div>
</template>

<style lang="scss" scoped>
.ad {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    .header {
        display: block;
        line-height: 1;
        span {
            display: block;
            color: var(--themeColor);
            text-align: center;
            font-size: 0.6em;
            margin-bottom: 0.5em;
            &.close {
                border-left: 1px solid var(--themeColor);
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2em;
                margin-left: auto;
                font-size: 1rem;
                height: 100%;
            }
        }
    }
    img {
        width: 400px;
        max-width: 100%;
        aspect-ratio: 1.5 / 1;
    }
}

@media (max-width: 700px) {
    .ad .header span {
        font-size: 0.7em;
    }
}
</style>
