<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import { useApiStore } from '@/stores/api';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const apiStore = useApiStore();
const userStore = useUserStore();

const hasBeanBag = computed(() => {
    return !!userStore.user?.inventory?.find(i => i.name === 'bean bag');
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
                <RouterLink to="/bets" @mouseover="() => apiStore.fetchPolls()"
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
                <RouterLink
                    to="/store"
                    @mouseover="() => apiStore.fetchLotto()"
                >
                    <img src="/assets/exchange.gif" alt="BEAN EXCHANGE" />
                </RouterLink>
                <RouterLink to="/inventory">
                    <img
                        src="/assets/inventory.gif"
                        style="width: calc(90% - 0.5em)"
                        alt="INVENTORY"
                        :class="{ hasBeanBag }"
                    />
                    <div v-if="hasBeanBag">
                        <img src="/assets/items/bag.png" />
                    </div>
                </RouterLink>
                <RouterLink to="/loan">
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
                max-width: 100%;
                display: block;
                margin-bottom: 1em;
                text-align: center;
                display: flex;
                flex-direction: row;
                &.patch {
                    justify-content: end;
                    img {
                        min-width: auto;
                        flex: 0;
                    }
                }
                & > img {
                    max-width: 100%;
                    flex: 1;
                    image-rendering: pixelated;
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
