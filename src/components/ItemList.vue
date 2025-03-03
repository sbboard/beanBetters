<script setup lang="ts">
import { useEconomy } from '@/composables/useEconomy';
import router from '@/router';
import { useApiStore } from '@/stores/api';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const userStore = useUserStore();
const apiStore = useApiStore();
const { ITEMS, addCommas } = useEconomy();

const { action, list } = defineProps<{
    action?: 'buy' | 'sell';
    list: InventoryItem[];
}>();

const api = import.meta.env.VITE_API;
async function buyItem(item: string) {
    if (action !== 'buy') return;
    if (item === 'lotto') {
        try {
            const response = await axios.post(`${api}/store/lottery`, {
                userId: userStore.user?._id,
            });
            alert(response.data.message);
            userStore.user = response.data.user;
            apiStore.lottoAmt.data = response.data.houseBeans;
        } catch (error) {
            console.error('Error playing lotto:', error);
        }
        return;
    }
    if (!confirm('Are you sure you want to buy this item?')) return;
    try {
        const response = await axios.post(`${api}/store/buy-item`, {
            userId: userStore.user?._id,
            itemName: item,
        });
        userStore.user = response.data.user;
    } catch (error) {
        console.error('Error buying item:', error);
    }
}

async function sellBeanBag(item: InventoryItem) {
    try {
        const response = await axios.post(`${api}/store/sell-item`, {
            userId: userStore.user?._id,
            itemName: item.name,
        });
        userStore.user = response.data.user;
        if (!userStore.user?.inventory?.length) {
            router.push({ path: '/' });
        }
    } catch (error) {
        console.error('Error selling item:', error);
    }
}

async function sellItem(item: InventoryItem) {
    if (action !== 'sell') return;
    if (item.specialPrice) return sellBeanBag(item);
    if (!confirm('Are you sure you want to sell this item?')) return;
    try {
        const response = await axios.post(`${api}/store/sell-item`, {
            userId: userStore.user?._id,
            itemName: item.name,
        });
        userStore.user = response.data.user;
        if (!userStore.user?.inventory?.length) {
            router.push({ path: '/' });
        }
    } catch (error) {
        console.error('Error selling item:', error);
    }
}

const isBuyDisabled = (item: InventoryItem) => {
    const { beans = 0, inventory = [], debt = 0 } = userStore.user || {};
    const itemPrice = ITEMS[item.name as keyof typeof ITEMS]?.price;

    return (
        beans < itemPrice ||
        inventory.some(invItem => invItem.name === item.name) ||
        (debt > 0 && item.name !== 'lotto')
    );
};

const buyCopy = (item: InventoryItem) => {
    const { beans = 0, inventory = [], debt = 0 } = userStore.user || {};
    const itemPrice = ITEMS[item.name as keyof typeof ITEMS]?.price;

    if (inventory.some(invItem => invItem.name === item.name)) return 'OWNED';
    if (debt > 0 && item.name !== 'lotto') return 'IN DEBT';
    if (beans < itemPrice) return 'CANNOT AFFORD';

    return 'BUY!!!';
};
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
            <p v-if="item.specialDescription">
                "{{ item.specialDescription }}"
            </p>
            <p v-else>
                {{ ITEMS[item.name as keyof typeof ITEMS]?.description }}
            </p>
            <p v-if="item.meta">
                <span v-if="item.name === 'bean bag'">
                    from {{ item.meta }}
                </span>
                <span v-else class="meta">{{ item.meta }}</span>
            </p>
            <span v-if="action === 'buy'"
                >{{
                    addCommas(ITEMS[item.name as keyof typeof ITEMS]?.price)
                }}
                BEANS</span
            >
            <span v-if="action === 'sell' && item.specialPrice">
                {{ addCommas(item.specialPrice) }} BEANS
            </span>
            <span v-else-if="action === 'sell'"
                >{{
                    ITEMS[item.name as keyof typeof ITEMS]?.maintainsValue
                        ? addCommas(
                              ITEMS[item.name as keyof typeof ITEMS]?.price
                          )
                        : addCommas(
                              ITEMS[item.name as keyof typeof ITEMS]?.price / 2
                          )
                }}
                BEANS</span
            >
            <button
                v-if="action === 'buy'"
                @click="buyItem(item.name)"
                :disabled="isBuyDisabled(item)"
            >
                {{ buyCopy(item) }}
            </button>
            <button
                v-if="action === 'sell' && item.specialPrice"
                @click="sellItem(item)"
            >
                CLAIM
            </button>
            <button v-else-if="action === 'sell'" @click="sellItem(item)">
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
    flex-wrap: wrap;
    .item {
        width: 160px;
        max-width: 25%;
        margin: 0 0.5em;
        text-align: center;
        background: radial-gradient(var(--themeColor), transparent 64%);
        background-size: 160px 160px;
        background-repeat: no-repeat;
        background-position: top;
        flex-direction: column;
        flex: 1;
        flex-basis: 20%;
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
            margin-bottom: 1em;
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

@media (max-width: 700px) {
    .items .item {
        max-width: 50%;
        flex-basis: 45%;
        background-size: 120px 120px;
        p {
            font-size: 0.8em;
        }
        img {
            width: 75px;
            padding: 20px 0;
        }
        .meta {
            font-size: 0.9em;
        }
        button {
            margin-top: 0.5em;
        }
    }
}
</style>
