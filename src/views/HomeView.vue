<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import { useApiStore } from '@/stores/api';
import { useUserStore } from '@/stores/user';

const apiStore = useApiStore();
const userStore = useUserStore();
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
                    class="betBtn"
                    to="/bets"
                    @mouseover="() => apiStore.fetchPolls()"
                    ><img src="/assets/bet.gif" alt="BET!"
                /></RouterLink>
                <RouterLink to="/rules"
                    ><img src="/assets/agree.gif" alt="BOOKIE AGREEMENT"
                /></RouterLink>
                <RouterLink
                    to="/leaderboards"
                    @mouseover="() => apiStore.fetchWinners()"
                    ><img src="/assets/leader.gif" alt="LEADERBOARDS"
                /></RouterLink>
                <RouterLink to="/store">
                    <img src="/assets/exchange.gif" alt="BEAN EXCHANGE" />
                </RouterLink>
                <RouterLink
                    v-if="userStore.user?.inventory?.length"
                    to="/inventory"
                >
                    <img src="/assets/inventory.gif" alt="INVENTORY" />
                </RouterLink>
                <RouterLink
                    v-if="userStore.user?.inventory?.length"
                    to="/inventory"
                >
                    <img src="/assets/loans.gif" alt="PERSONAL LOANS" />
                </RouterLink>
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
            & > a {
                min-width: 100%;
                display: block;
                margin-bottom: 1em;
                text-align: center;
                &.betBtn {
                    img {
                        width: 100%;
                    }
                }
                &.patch {
                    text-align: right;
                    img {
                        min-width: auto;
                    }
                }
                & > img {
                    max-width: 100%;
                    min-width: 100%;
                    image-rendering: pixelated;
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
    }
}
</style>
