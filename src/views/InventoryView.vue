<script setup lang="ts">
import { addCommas } from '@/composables/useEconomy';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const userStore = useUserStore();

const ITEMS = {
    // invite: { price: 20000000 },
    // 'bookie license': { price: 15000000 },
    adblock: { displayName: 'Ad Block', price: 5000000, icon: 'adblock.png' },
    // lotto: { price: 10000 },
};

async function sellItem(item: string) {
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
        console.error('Error placing bet:', error);
    }
}
</script>

<template>
    <div>
        <div
            class="item"
            v-for="item in userStore.user?.inventory"
            :key="item.name"
        >
            <img
                :src="`/assets/items/${ITEMS[item.name as keyof typeof ITEMS]?.icon}`"
                :alt="item.name"
            />
            <span class="name">{{
                ITEMS[item.name as keyof typeof ITEMS].displayName
            }}</span>
            <span
                >Value:
                {{
                    addCommas(ITEMS[item.name as keyof typeof ITEMS].price / 2)
                }}
                BEANS</span
            >
            <button @click="sellItem(item.name)">SELL</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
div {
    width: 640px;
    max-width: 100%;
    margin: 0 auto;
    .item {
        display: inline-block;
        width: 160px;
        max-width: 23%;
        text-align: center;
        background: radial-gradient(#0098ffb8, transparent 64%);
        background-size: 160px 160px;
        background-repeat: no-repeat;
        background-position: top;
        margin: 0 1%;
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
            color: black;
            padding: 0.5em;
            font-weight: bold;
            font-size: 1.1em;
            cursor: pointer;
            &:disabled {
                background-color: transparent;
                border: 1px solid var(--themeColor);
                color: var(--themeColor);
                cursor: not-allowed;
                font-size: 0.9rem;
                opacity: 0.5;
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
