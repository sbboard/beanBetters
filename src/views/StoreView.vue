<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import { addCommas, ITEMS } from '@/composables/useEconomy';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const userStore = useUserStore();

const itemArray = Object.entries(ITEMS).map(
    ([name, { price, icon, displayName, description }]) => ({
        name,
        displayName,
        description,
        price,
        icon: icon || `${name}.png`,
    })
);

async function buyItem(item: string) {
    try {
        const response = await axios.post(
            'https://www.gang-fight.com/api/beans/store/buy-item',
            {
                userId: userStore.user?._id,
                itemName: item,
            }
        );
        userStore.user = response.data.user;
        console.log(userStore.user);
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}
</script>

<template>
    <div>
        <div class="head">
            <CharacterPortraits
                class="character"
                character="store"
                dir="vert"
            />
            <img src="/assets/exchange.gif" alt="STORE" />
        </div>
        <div class="items">
            <div class="item" v-for="item in itemArray" :key="item.name">
                <img :src="`/assets/items/${item.icon}`" :alt="item.name" />
                <span class="name">{{ item.displayName }}</span>
                <p>{{ item.description }}</p>
                <span>{{ addCommas(item.price) }} BEANS</span>
                <button
                    @click="buyItem(item.name)"
                    :disabled="
                        (userStore.user?.beans || 0) < item.price ||
                        userStore.user?.inventory?.some(
                            invItem => invItem.name === item.name
                        )
                    "
                >
                    {{
                        (userStore.user?.beans || 0) < item.price
                            ? 'CANNOT AFFORD'
                            : userStore.user?.inventory?.some(
                                  invItem => invItem.name === item.name
                              )
                            ? 'OWNED'
                            : 'BUY!!!'
                    }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    flex-direction: row;
    margin-bottom: 1em;
    .character {
        width: 150px;
        margin: 0;
        margin-right: 1em;
        image-rendering: auto !important;
        max-width: 25%;
        height: 150px;
    }
    img {
        height: 125px;
        width: 75%;
        image-rendering: pixelated;
    }
}
div {
    max-width: 100%;
    margin: 0 auto;
    .items {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
        .item {
            width: 160px;
            max-width: 25%;
            text-align: center;
            background: radial-gradient(#0098ffb8, transparent 64%);
            background-size: 160px 160px;
            background-repeat: no-repeat;
            background-position: top;
            margin-right: 1em;
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
