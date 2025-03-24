<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onMounted, ref, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import NotificationTable from '@/components/NotificationTable.vue';

const userStore = useUserStore();
const router = useRouter();
const lastCheck = ref<Date | null>(null);
const api = import.meta.env.VITE_API;

const newNotifications: ComputedRef<Notification[]> = computed(() => {
    if (!lastCheck.value) return [];
    const clonedNotifications = userStore.user?.notifications?.slice();
    if (!clonedNotifications) return [];
    return clonedNotifications
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter(notif => notif.date > lastCheck.value!);
});

const oldNotifications: ComputedRef<Notification[]> = computed(() => {
    const clonedNotifications = userStore.user?.notifications?.slice();
    if (!clonedNotifications) return [];
    return clonedNotifications
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter(notif => notif.date <= (lastCheck.value || new Date()));
});

// Intercept clicks on law links to use Vue Router navigation
const handleClick = (event: MouseEvent) => {
    const target = event.target as Element;
    if (target.matches('.law-link')) {
        event.preventDefault();
        const href = target.getAttribute('href');
        if (href) router.push(href);
    }
};

onMounted(async () => {
    lastCheck.value = userStore.user?.notificationsLastChecked || null;
    const response = await axios.put(
        `${api}/user/${userStore.user?._id}/update-notification`
    );
    if (response) userStore.user = response.data.user;
});
</script>

<template>
    <div @click="handleClick" class="notifs">
        <h1>Notifications</h1>
        <NotificationTable
            v-if="newNotifications.length"
            :notifications="newNotifications"
        ></NotificationTable>
        <NotificationTable
            :notifications="oldNotifications"
            :old="true"
        ></NotificationTable>
    </div>
</template>

<style lang="scss" scoped>
.notifs {
    width: 750px;
    margin: 0 auto;
    max-width: 100%;
}
</style>
