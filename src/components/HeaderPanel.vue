<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useLogout } from '@/composables/useLogin';
import { useEconomy } from '@/composables/useEconomy';
import { computed } from 'vue';

const userStore = useUserStore();
const { addCommas } = useEconomy();

const unreadNotifications = computed(() => {
    const { notifications, notificationsLastChecked } = userStore.user || {};
    if (!notificationsLastChecked) return notifications?.length || 0;
    return (
        notifications?.filter(n => n.date > notificationsLastChecked).length ||
        0
    );
});
</script>

<template>
    <div class="welcome">
        <div>
            Happy betting,
            <strong
                @click="
                    () =>
                        userStore.user?.role === 'admin'
                            ? $router.push('/admin')
                            : null
                "
                >{{ userStore.user?.role }} {{ userStore.user?.name }}</strong
            ><br />
            Bean Bag:
            <strong>{{ addCommas(userStore.user?.beans || 0) }} Beans</strong>
        </div>
        <div class="rightside">
            <span>
                <RouterLink
                    to="/notifications"
                    :class="{ empty: unreadNotifications < 1 }"
                >
                    💌[{{ unreadNotifications }}]
                </RouterLink></span
            ><br />
            <span @click="useLogout()" class="logout">Logout</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.welcome {
    margin-top: 10px;
    flex-direction: row;
    font-size: 1.1em;
    align-items: end;
    display: flex;
    justify-content: space-between;
    & > div {
        display: block;
        max-width: unset;
    }
    strong {
        font-weight: bold;
    }
    .rightside {
        text-align: right;
        .logout {
            width: fit-content;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
        .empty {
            color: white;
            opacity: 0.5;
        }
    }
}
</style>
