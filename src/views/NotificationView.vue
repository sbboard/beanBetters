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

const deleteNotifs = async () => {
    if (
        confirm(
            'Warning: You are about to permanently delete all your notifications.\n' +
                'These notifications are useful as evidence and alibis.\n' +
                'Are you sure you want to clear?'
        )
    ) {
        const response = await axios.put(
            `${api}/user/${userStore.user?._id}/clear-notifications`
        );
        if (response) userStore.user = response.data.user;
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
    <div class="notifs">
        <div class="header">
            <h1>Notifications</h1>
            <div
                :class="{
                    disabled:
                        !userStore.user?.notifications ||
                        !userStore.user.notifications.length,
                }"
                @click="deleteNotifs"
            >
                DELETE ALL
            </div>
        </div>
        <NotificationTable
            @click="handleClick"
            v-if="newNotifications.length"
            :notifications="newNotifications"
        ></NotificationTable>
        <NotificationTable
            @click="handleClick"
            :notifications="oldNotifications"
            :old="true"
        ></NotificationTable>
        <div
            style="margin-top: 2em; font-style: italic; text-align: center"
            v-if="
                !userStore.user?.notifications ||
                !userStore.user.notifications.length
            "
        >
            Notification inbox empty
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notifs {
    width: 750px;
    margin: 0 auto;
    max-width: 100%;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h1 {
        margin-bottom: 0;
    }
    div {
        cursor: pointer;
        display: block;
        padding: 0.5em;
        padding-right: 0;
        text-align: center;
        font-weight: bold;
        &:hover {
            text-decoration: underline;
        }
        &.disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    }
}
</style>
