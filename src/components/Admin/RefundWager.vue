<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { ref } from 'vue';
const api = import.meta.env.VITE_API;
const userStore = useUserStore();

const wagerId = ref('');

const banWager = async () => {
    if (!wagerId.value) return;
    try {
        await axios.post(`${api}/admin/refund-wager`, {
            userId: userStore.user?._id,
            userKey: userStore.key,
            pollId: wagerId.value,
        });
        alert('Wager refunded!');
        wagerId.value = '';
    } catch (error) {
        console.error('Error refunding wager:', error);
    }
};
</script>

<template>
    <h1>Refund Wager</h1>
    <div>
        <input v-model="wagerId" placeholder="Enter wager ID..." />
        <button @click="banWager">Refund Wager</button>
    </div>
</template>

<style lang="scss" scoped></style>
