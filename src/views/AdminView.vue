<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import RefundWager from '@/components/Admin/RefundWager.vue';

const message = ref('');
const api = import.meta.env.VITE_API;
const userStore = useUserStore();
const houseInvites = ref([]);

const illegalWagerId = ref('');
const lawsBroken = ref('');

const banWager = async () => {
    if (!illegalWagerId.value || !lawsBroken.value) return;
    try {
        await axios.post(`${api}/admin/make-poll-illegal`, {
            userId: userStore.user?._id,
            userKey: userStore.key,
            pollId: illegalWagerId.value,
            lawsBroken: lawsBroken.value,
        });
        alert('Wager banned!');
        illegalWagerId.value = '';
        lawsBroken.value = '';
    } catch (error) {
        console.error('Error banning wager:', error);
    }
};

const sendNotification = async () => {
    if (!message.value) return;
    try {
        await axios.post(`${api}/admin/mass-notification`, {
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

const getHouseInvites = async () => {
    try {
        const { data } = await axios.get(`${api}/admin/house-invites`, {
            params: {
                userId: userStore.user?._id,
                userKey: userStore.key,
            },
        });
        const invites = data.invites;
        houseInvites.value = invites.map(
            (invite: { meta: unknown }) => invite.meta
        );
    } catch (error) {
        console.error('Error fetching house invites:', error);
    }
};

const generateHouseInvite = async () => {
    try {
        const { data } = await axios.post(`${api}/admin/house-invites`, {
            userId: userStore.user?._id,
            userKey: userStore.key,
        });
        const invites = data.invites;
        houseInvites.value = invites.map(
            (invite: { meta: unknown }) => invite.meta
        );
    } catch (error) {
        console.error('Error fetching house invites:', error);
    }
};

onMounted(() => {
    if (userStore.user?.role === 'admin') {
        getHouseInvites();
        return;
    }
    alert('Stop trying to be sneaky!');
    window.location.href = '/';
});
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
        <h1>House Invites</h1>
        {{ houseInvites }}
        <button @click="generateHouseInvite">Generate House Invite</button>
        <hr />
        <h1>Ban Wager</h1>
        <div>
            <input v-model="illegalWagerId" placeholder="Enter wager ID..." />
            <input
                v-model="lawsBroken"
                placeholder="Enter laws broken. Separate with commas."
            />
            <button @click="banWager">Ban Wager</button>
        </div>
        <hr />
        <RefundWager />
    </div>
</template>

<style lang="scss" scoped>
hr {
    margin: 40px 0;
    border: 1px solid var(--themeColor);
}
</style>
