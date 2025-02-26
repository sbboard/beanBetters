<script setup lang="ts">
import { addCommas, ITEMS } from '@/composables/useEconomy';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const userStore = useUserStore();

const { action, list } = defineProps<{
    action?: 'buy' | 'sell';
    list: Item[];
}>();

async function buyItem(item: string) {
    if (action !== 'buy') return;
    try {
        const response = await axios.post(
            'https://www.gang-fight.com/api/beans/store/buy-item',
            {
                userId: userStore.user?._id,
                itemName: item,
            }
        );
        userStore.user = response.data.user;
    } catch (error) {
        console.error('Error buying item:', error);
    }
}

async function sellItem(item: string) {
    if (action !== 'sell') return;
    try {
        const response = await axios.post(
            'https://www.gang-fight.com/api/beans/store/sell-item',
            {
                userId: userStore.user?._id,
                itemName: item,
            }
        );
        userStore.user = response.data.user;
        if (!userStore.user?.inventory?.length) {
            router.push({ path: '/' });
        }
    } catch (error) {
        console.error('Error selling item:', error);
    }
}
</script>

<template>
    <div class="items">
        <div class="item" v-for="item in list" :key="item.name">
            <img
                :src="`/assets/items/${ITEMS[item.name as keyof typeof ITEMS]?.icon}`"
                :alt="item.name"
            />
            <span class="name">{{
                ITEMS[item.name as keyof typeof ITEMS]?.displayName
            }}</span>
            <p v-if="action === 'buy'">
                {{ ITEMS[item.name as keyof typeof ITEMS]?.description }}
            </p>
            <p v-if="action === 'sell'">
                <span class="meta" v-if="item.meta">{{ item.meta }}</span>
            </p>
            <span v-if="action === 'buy'"
                >{{
                    addCommas(ITEMS[item.name as keyof typeof ITEMS]?.price)
                }}
                BEANS</span
            >
            <span v-if="action === 'sell'"
                >{{
                    addCommas(ITEMS[item.name as keyof typeof ITEMS]?.price / 2)
                }}
                BEANS</span
            >
            <button
                v-if="action === 'buy'"
                @click="buyItem(item.name)"
                :disabled="
                    (userStore.user?.beans || 0) < ITEMS[item.name as keyof typeof ITEMS]?.price ||
                    userStore.user?.inventory?.some(
                        invItem => invItem.name === item.name
                    )
                "
            >
                {{
                    userStore.user?.inventory?.some(
                        invItem => invItem.name === item.name
                    )
                        ? 'OWNED'
                        : (userStore.user?.beans || 0) <
                          ITEMS[item.name as keyof typeof ITEMS]?.price
                        ? 'CANNOT AFFORD'
                        : 'BUY!!!'
                }}
            </button>
            <button v-if="action === 'sell'" @click="sellItem(item.name)">
                SELL
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.items {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    .item {
        width: 160px;
        max-width: 25%;
        margin: 0 .5em;
        text-align: center;
        background: radial-gradient(#0098ffb8, transparent 64%);
        background-size: 160px 160px;
        background-repeat: no-repeat;
        background-position: top;
        flex-direction: column;
        flex: 1;
        p {
            font-size: 0.9em;
        }
        > * {
            display: block;
        }
        img {
            width: 100px;
            padding: 30px 0;
            margin: 0 auto;
            image-rendering: pixelated;
            animation: bounce 1s infinite;
            transition: all 0.2s;
        }
        button {
            margin-top: 1rem;
            width: 100%;
            border: 0;
            outline: 0;
            background-color: var(--themeColor);
            border: 1px solid var(--themeColor);
            color: black;
            padding: 0.5rem;
            font-weight: bold;
            font-size: 1.1rem;
            cursor: pointer;
            &:disabled {
                background-color: transparent;
                border: 1px solid var(--themeColor);
                color: var(--themeColor);
                cursor: not-allowed;
                opacity: 0.5;
                font-weight: 400;
            }
        }
        span {
            color: var(--themeColor);
            &.name {
                font-weight: bold;
                font-size: 1.2em;
            }
        }
    }
}

.meta {
    font-weight: bold;
    border: 1px solid var(--themeColor);
    margin-bottom: 1em;
    display: block;
    width: fit-content;
    margin: 0 auto;
    padding: 0.25em 1em;
}

@keyframes bounce {
    0% {
        transform: translateY(2px);
    }
    50% {
        transform: translateY(-2px);
    }
    100% {
        transform: translateY(2px);
    }
}
</style>
