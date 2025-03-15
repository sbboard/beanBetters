<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Intercept clicks on law links to use Vue Router navigation
const handleClick = (event: MouseEvent) => {
    const target = event.target as Element; // Explicitly cast to Element

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

// Parses links in notification messages
const parseMessage = (message: string): string => {
    const lawRegex = /laws?:?\s*(\d+(?:,\s*\d+)*)\./gi; // Allow multiple numbers separated by commas

    // Convert numbers to Roman numerals
    const toRoman = (num: number): string => {
        const romanMap: [number, string][] = [
            [1000, 'M'],
            [900, 'CM'],
            [500, 'D'],
            [400, 'CD'],
            [100, 'C'],
            [90, 'XC'],
            [50, 'L'],
            [40, 'XL'],
            [10, 'X'],
            [9, 'IX'],
            [5, 'V'],
            [4, 'IV'],
            [1, 'I'],
        ];
        let result = '';
        for (const [value, numeral] of romanMap) {
            while (num >= value) {
                result += numeral;
                num -= value;
            }
        }
        return result;
    };

    // Replace law references with Vue Router links (using <a> with "to" for SPA navigation)
    return message.replace(lawRegex, (_, lawNumbers: string) => {
        const lawList: string[] = lawNumbers.split(',').map(num => num.trim()); // Split by comma and trim spaces
        const romanizedLaws = lawList
            .map((num: string) => {
                const romanNumeral = toRoman(parseInt(num, 10));
                return `<a href="/rules#${num}" class="law-link">${romanNumeral}</a>`; // Link each Roman numeral
            })
            .join(', '); // Join the individual law links with commas
        return `laws: ${romanizedLaws}.`; // Keep the colon after "laws"
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
</style>
