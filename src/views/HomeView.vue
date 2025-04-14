<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import { useApiStore } from '@/stores/api';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const apiStore = useApiStore();
const userStore = useUserStore();

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
    <div class="home">
        <div>
            <div class="left">
                <CharacterPortraits character="king" />
            </div>
            <div>
                <!-- https://picasion.com/glitter-maker/ -->
                <RouterLink
                    class="bet"
                    to="/bets"
                    @mouseover="() => apiStore.fetchPolls()"
                    ><img src="/assets/bet.gif" alt="BET!"
                /></RouterLink>
                <RouterLink to="/notifications" class="notif">
                    <img
                        style="width: calc(90% - 0.5em)"
                        src="/assets/notif.gif"
                        alt="NOTIFICATIONS"
                    />
                    <div v-if="unreadNotifications > 0">
                        <span>{{
                            unreadNotifications > 9 ? '9+' : unreadNotifications
                        }}</span>
                    </div>
                </RouterLink>
                <RouterLink
                    to="/leaderboards"
                    @mouseover="() => apiStore.fetchWinners()"
                    ><img src="/assets/leader.gif" alt="LEADERBOARDS"
                /></RouterLink>
                <RouterLink
                    to="/store"
                    @mouseover="() => apiStore.fetchLotto()"
                >
                    <img src="/assets/exchange.gif" alt="BEAN EXCHANGE" />
                </RouterLink>
                <RouterLink to="/inventory">
                    <img src="/assets/inventory.gif" alt="INVENTORY" />
                </RouterLink>
                <RouterLink class="rules" to="/rules"
                    ><img src="/assets/agree.gif" alt="BOOKIE AGREEMENT"
                /></RouterLink>
                <RouterLink class="patch" to="/notes"
                    ><img src="/assets/patch.gif" alt="patch notes"
                /></RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    img {
        filter: sepia(1) hue-rotate(33deg) saturate(3.5) contrast(1.5);
    }
    & > img {
        max-width: 100%;
    }
    hr {
        width: 100%;
        margin: 5px0 50px 0;
    }
    & > div {
        display: flex;
        justify-content: space-between;
        & > img,
        & > div {
            max-width: 50vmin;
            display: inline-flex;
            flex-direction: column;
            vertical-align: text-top;
            align-items: flex-end;
            border-radius: 10px;
            width: 700px;
            justify-content: space-between;
            & > a {
                min-width: 100%;
                max-width: 100%;
                text-align: center;
                display: flex;
                flex-direction: row;
                align-items: center;
                & > img {
                    max-width: 100%;
                    flex: 1;
                    image-rendering: pixelated;
                    height: 100%;
                }
                & > div {
                    height: 100%;
                    aspect-ratio: 1 / 1;
                    background: linear-gradient(180deg, #ffffdc, #bbfc00);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 100%;
                    animation: blink 1s infinite;
                    margin-left: 0.5em;
                    img {
                        max-width: 50%;
                        image-rendering: pixelated;
                    }
                    span {
                        font-size: 1.5em;
                        font-weight: bold;
                        color: black;
                    }
                }
                height: 12.5%;
                &.bet {
                    height: 40%;
                }
                &.patch {
                    justify-content: end;
                    height: 7.5%;
                    img {
                        min-width: auto;
                        flex: 0;
                    }
                }
            }
        }
        .left {
            position: relative;
            margin-right: 10px;
        }
    }
}

@media (max-width: 700px) {
    .home > div {
        flex-direction: column;
        align-items: center;
        & div {
            width: 500px;
            max-width: 100%;
            &.left {
                width: 250px;
                max-width: 100%;
                margin-bottom: 1em;
            }
        }
        .notif {
            img {
                width: 90%;
            }
            div {
                width: auto;
                min-width: 10%;
            }
        }
    }
}

@keyframes blink {
    0% {
        opacity: 0.5;
    }
    49% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
}
</style>
