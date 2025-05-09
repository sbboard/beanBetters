<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CharacterPortraits from '../CharacterPortraits.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

//if today is thursday, show the banner
const api = import.meta.env.VITE_API;
const userStore = useUserStore();
const userId = userStore.user?._id;

const isThursday = ref(false);
const canClaim = computed(() => isThursday.value && !claimed.value);

const claim = async () => {
    if (!canClaim.value) return;
    const response = await axios.post(`${api}/user/bonus`, {
        userId,
    });
    userStore.user = response.data.user;
};

const claimed = computed(() => {
    const user = userStore.user;
    if (!user) return false;
    const lastBonusDate = user.lastBonusClaimed
        ? new Date(user.lastBonusClaimed)
        : null;
    const today = new Date();
    const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    return !!lastBonusDate && lastBonusDate >= startOfToday;
});

onMounted(() => {
    const today = new Date();
    const day = today.getDay();
    isThursday.value = day === 4; // 0 = Sunday, 1 = Monday, ..., 4 = Thursday
});
</script>

<template>
    <div class="bonus" :class="{ disabled: !canClaim }">
        <CharacterPortraits
            :character="isThursday && !claimed ? 'thor' : 'thorempty'"
            class="thor"
            dir="none"
        />
        <div class="info">
            <h1>BEAN DAY LOGIN BONUS</h1>
            <p>
                Log in every Thursday to claim 5,000,000 beans courtesy of The
                House.
            </p>
            <button :disabled="!isThursday || claimed" @click="claim">
                {{
                    isThursday
                        ? claimed
                            ? 'BEANS CLAIMED'
                            : 'CLAM YOUR BEANS NOW!!!'
                        : 'COME BACK THURSDAY'
                }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bonus {
    margin: 1em 0 1em 0;
    border: 1px solid var(--themeColor);
    &.disabled {
        opacity: 0.5;
        pointer-events: none;
    }
    .thor {
        max-width: 100px;
        border-right: 1px solid var(--themeColor);
        border-radius: 0;
    }
    .info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        h1 {
            margin-top: 0.5rem;
            padding-left: 0.5rem;
            margin-bottom: 0;
            text-align: left;
            font-size: 1rem;
        }
        p {
            padding: 0.5em 0;
            padding-left: 0.5rem;
            font-size: 0.9rem;
            text-align: left;
        }
        button {
            width: 100%;
            border: 0;
            outline: 0;
            background-color: var(--themeColor);
            border: 1px solid var(--themeColor);
            color: black;
            padding: 0.5rem;
            font-weight: bold;
            font-size: 0.9rem;
            border-bottom: 0px !important;
            border-right: 0px !important;
            border-left: 0px !important;
            cursor: pointer;
            &:disabled {
                background-color: transparent;
                border: 1px solid var(--themeColor);
                color: var(--themeColor);
                cursor: not-allowed;
                font-weight: 400;
            }
        }
    }
}

@media (max-width: 700px) {
    .bonus .thor {
        margin-right: 0;
        border-right: 0;
        margin-top: 0.5rem;
    }
    .info {
        width: 100%;
        button {
            width: 100%;
        }
    }
}
</style>
