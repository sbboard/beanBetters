<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <div
            v-if="
                !userStore.user?.inventory || !userStore.user.inventory.length
            "
            style="text-align: center"
        >
            Empty
        </div>
        <ItemList v-else :action="'sell'" :list="userStore.user.inventory" />
    </div>
</template>

<style lang="scss" scoped></style>
