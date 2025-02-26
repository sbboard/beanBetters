<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <ItemList :action="'sell'" :list="userStore.user?.inventory || []" />
    </div>
</template>

<style lang="scss" scoped></style>
