<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const api = import.meta.env.VITE_API;

const sortedNotifications = computed(() => {
    const clonedNotifications = userStore.user?.notifications?.slice();
    if (!clonedNotifications) return [];
    return clonedNotifications.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
});

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${
        d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

onMounted(async () => {
    const response = await axios.put(
        `${api}/user/${userStore.user?._id}/update-notification`
    );
    if (response) userStore.user = response.data.user;
});
</script>

<template>
    <div>
        <h1>Notifications</h1>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="notification in sortedNotifications"
                    :key="notification._id"
                >
                    <td class="date">
                        {{ formatDate(notification.date.toString()) }}
                    </td>
                    <td class="msg">{{ notification.text }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
th {
    text-align: left;
}
.date {
    width: 150px;
}
td {
    padding: 0.5em;
}
</style>
