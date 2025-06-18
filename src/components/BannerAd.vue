<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { disableHr } = defineProps<{
    disableHr?: 'true';
}>();

const route = useRoute();
const userStore = useUserStore();
const currentPath = route.path.replace('/', '');
const ads = ['loan', 'artist', 'store'].filter(ad => ad !== currentPath);
const randomIndex = Math.floor(Math.random() * ads.length);
const ad = ads[randomIndex];
const hasEye = computed(() => userStore.checkItem('joes eye'));
</script>

<template>
    <div v-if="!userStore.checkItem('adblock')" class="banner">
        <RouterLink :to="`/${ad}`">
            <!-- banner ads are 960x100 -->
            <img :src="`/assets/banners/${ad}${hasEye ? '_nojoe' : ''}.jpg`" />
        </RouterLink>
        <span>SPONSORED CONTENT HELPS SUPPORT THE SODA ENJOYER SEED FUND</span>
    </div>
    <hr v-else-if="!disableHr" />
</template>

<style lang="scss" scoped>
.banner {
    width: 100%;
    margin: 1em 0;
    display: flex;
    line-height: 0;
    flex-direction: column;
    img {
        width: 100%;
        filter: none;
    }
    span {
        display: block;
        color: var(--themeColor);
        text-align: left;
        font-size: 0.6em;
        line-height: 1;
        margin-top: 0.25rem;
    }
}

hr {
    width: 100%;
    margin: 1em 0;
    border-color: var(--themeColor);
}
</style>
