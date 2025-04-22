<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { to, src } = defineProps<{ to: string; src: string }>();
</script>

<template>
    <div v-if="!userStore.checkItem('adblock')" class="banner">
        <RouterLink :to><img :src /> </RouterLink>
        <span>SPONSORED CONTENT HELPS SUPPORT THE SODA ENJOYER SEED FUND</span>
    </div>
    <hr v-else />
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
        margin-top: .25rem;
    }
}

hr {
    width: 100%;
    margin: 1em 0;
    border-color: var(--themeColor);
}
</style>
