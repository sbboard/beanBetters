<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import toRoman from '../utils/toRoman';

const router = useRouter();

// Intercept clicks on law links to use Vue Router navigation
const handleClick = (event: MouseEvent) => {
    const target = event.target as Element;
    if (target.matches('.law-link')) {
        event.preventDefault();
        const href = target.getAttribute('href');
        if (href) router.push(href);
    }
};

const userStore = useUserStore();
const api = import.meta.env.VITE_API;

const sortedNotifications = computed(() => {
    const clonedNotifications = userStore.user?.notifications?.slice();
    if (!clonedNotifications) return [];
    return clonedNotifications.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
});

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${
        d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

const parseMessage = (message: string): string => {
    const lawRegex = /laws?:?\s*(\d+(?:,\s*\d+)*)\./gi;
    return message.replace(lawRegex, (_, lawNumbers: string) => {
        const lawList: string[] = lawNumbers.split(',').map(num => num.trim());
        const romanizedLaws = lawList
            .map((num: string) => {
                const romanNumeral = toRoman(parseInt(num, 10));
                return `<a href="/rules#${num}" class="law-link">${romanNumeral}</a>`;
            })
            .join(', ');
        return `laws: ${romanizedLaws}.`;
    });
};

onMounted(async () => {
    const response = await axios.put(
        `${api}/user/${userStore.user?._id}/update-notification`
    );
    if (response) userStore.user = response.data.user;
});
</script>

<template>
    <div @click="handleClick">
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
                    <td
                        class="msg"
                        v-html="parseMessage(notification.text)"
                    ></td>
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

@media (max-width: 700px) {
    .date {
        width: initial;
    }
}
</style>
