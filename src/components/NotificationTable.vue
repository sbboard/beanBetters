<script setup lang="ts">
import toRoman from '../utils/toRoman';

const { notifications, old } = defineProps<{
    notifications: Notification[];
    old?: boolean;
}>();

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
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
</script>

<template>
    <table :class="{ old }">
        <tbody>
            <tr v-for="notification in notifications" :key="notification._id">
                <td class="date">
                    {{ formatDate(notification.date.toString()) }}
                </td>
                <td class="msg" v-html="parseMessage(notification.text)"></td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
table {
    tbody {
        border: 0;
        tr {
            border: 0;
            border-bottom: 1px solid var(--themeColor);
            display: flex;
            td {
                padding: 1rem 0.5rem;
                border: 0;
                &.date {
                    white-space: nowrap;
                    font-size: 0.8em;
                    padding-right: 2em;
                }
                &.msg {
                    flex: 1;
                }
            }
        }
    }
    &.old {
        color: rgb(177, 177, 177);
        tbody tr {
            border-bottom: 1px solid var(--themeColorOpaque);
            &:last-of-type {
                border-bottom: 0 !important;
            }
        }
    }
}

@media (max-width: 700px) {
    tbody tr td.date {
        white-space: wrap;
    }
}
</style>
