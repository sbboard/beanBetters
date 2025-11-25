<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import SettlingSoon from '@/components/Home/SettlingSoon.vue';
import ThursdayBonus from '@/components/Home/ThursdayBonus.vue';
import { useApiStore } from '@/stores/api';

const apiStore = useApiStore();
</script>

<template>
    <div class="home">
        <SettlingSoon />
        <div>
            <div class="left">
                <CharacterPortraits character="king" />
            </div>
            <div>
                <!-- https://picasion.com/glitter-maker/ -->
                <RouterLink
                    class="bet"
                    to="/bets"
                    @mouseover="() => apiStore.fetchPolls('open')"
                    ><img src="/assets/bet.gif" alt="BET!"
                /></RouterLink>
                <RouterLink class="rules" to="/rules"
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
                    <img src="/assets/inventory.gif" alt="INVENTORY" />
                </RouterLink>
                <RouterLink class="patch" to="/notes"
                    ><img src="/assets/patch.gif" alt="patch notes"
                /></RouterLink>
            </div>
        </div>
        <ThursdayBonus />
        <!-- <BannerAd disable-hr="true" />
        <DonateToCause /> -->
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
        margin: 1em 0;
        border-color: var(--themeColor);
    }
    & > div {
        display: flex;
        justify-content: space-between;
        & > img,
        & > div {
            max-width: 50%;
            aspect-ratio: 1;
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
                    height: 37.5%;
                }
                &.patch {
                    justify-content: end;
                    height: 7.5%;
                    img {
                        min-width: auto;
                        max-width: 50%;
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
                margin-right: 0;
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
