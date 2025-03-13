<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { ref } from 'vue';

const message = ref('');
const api = import.meta.env.VITE_API;
const userStore = useUserStore();

const sendNotification = async () => {
    if (!message.value) return;

    try {
        await axios.post(`${api}/mass-notification`, {
            userId: userStore.user?._id,
            userKey: userStore.key,
            message: message.value,
        });
        alert('Notification sent!');
        message.value = '';
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};
</script>

<template>
    <div>
        <h1>Send Mass Notification</h1>
        <div style="display: flex">
            <textarea
                style="flex: 1"
                v-model="message"
                placeholder="Enter your message here..."
            ></textarea>
            <button style="width: 100px" @click="sendNotification">Send</button>
        </div>
        <hr />
        <h1>Ban Wager</h1>
    </div>
</template>

<style lang="scss" scoped>
hr {
    margin: 40px 0;
    border: 1px solid var(--themeColor);
}
</style>
