<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import { useUserStore } from '../stores/user';
import { useLogout } from '@/composables/useLogin';
const userStore = useUserStore();
</script>

<template>
    <div class="home">
        <div class="welcome">
            <div>
                Welcome home,
                <strong>{{ userStore.user?.name }}</strong
                ><br />
                Current Wins: <strong>{{ userStore.user?.wins.length }}</strong>
            </div>
            <div @click="useLogout()" class="logout">Logout</div>
        </div>
        <hr />
        <div>
            <div class="left">
                <CharacterPortraits character="king" />
            </div>
            <div>
                <!-- https://picasion.com/glitter-maker/ -->
                <RouterLink class="betBtn" to="/bets"
                    ><img src="/assets/bet.gif" alt="BET!"
                /></RouterLink>
                <RouterLink to="/leaderboards"
                    ><img src="/assets/leader.gif" alt="LEADERBOARDS"
                /></RouterLink>
                <RouterLink to="/rules"
                    ><img src="/assets/agree.gif" alt="BOOKIE AGREEMENT"
                /></RouterLink>
                <RouterLink to="/notes"
                    ><img src="/assets/patch.gif" alt="patch notes"
                /></RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    .welcome {
        display: flex;
        margin-top: 10px;
        flex-direction: row;
        font-size: 1.1em;
        align-items: end;
        & > div {
            display: block;
            max-width: unset;
        }
        strong {
            font-weight: bold;
        }
        .logout {
            text-align: right;
            width: fit-content;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
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
                & > img {
                    max-width: 100%;
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
