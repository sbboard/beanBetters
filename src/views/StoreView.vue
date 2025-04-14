<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import ItemList from '@/components/ItemList.vue';
import SendBeans from '@/components/SendBeans.vue';
import { useEconomy } from '@/composables/useEconomy';
import { useApiStore } from '@/stores/api';
import { useUserStore } from '@/stores/user';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const apiStore = useApiStore();
const { ITEMS, addCommas } = useEconomy();

const itemArray = computed(() =>
    Object.entries(ITEMS)
        .filter(([, item]) => !item.hideFromStore)
        .map(([name]) => ({
            name,
            _id: name,
            meta:
                name === 'lotto'
                    ? `${addCommas(apiStore.lottoAmt.data)} BEANS`
                    : '',
        }))
);

onMounted(() => apiStore.fetchLotto());
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
        <ItemList :action="'buy'" :list="itemArray" />
        <RouterLink to="/loan" v-if="!userStore.checkItem('adblock')">
            <img src="/assets/loan_ad.jpg" alt="PERSONAL LOANS" />
        </RouterLink>
        <hr  v-else/>
        <h1>BEAN WIRE TRANSFER</h1>
        <SendBeans />
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
        filter: sepia(1) hue-rotate(33deg) saturate(3.5) contrast(1.5);
    }
}

h1 {
    text-align: left;
}

hr {
    margin: 1em 0 2em 0;
    border-color: var(--themeColor);
}

@media (max-width: 700px) {
    .head {
        height: 75px;
        .character,
        img {
            height: 75px;
        }
    }
}

a {
    display: block;
    width: 100%;
    background: none !important;
    margin-bottom: 20px;
    img {
        width: 100%;
        height: 200px;
    }
}
</style>
