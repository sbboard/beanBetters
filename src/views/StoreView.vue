<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import ItemList from '@/components/ItemList.vue';
import { ITEMS } from '@/composables/useEconomy';

const itemArray = Object.entries(ITEMS).map(
    ([name, { price, icon, displayName, description }]) => ({
        name,
        displayName,
        description,
        price,
        icon: icon || `${name}.png`,
        meta: '',
    })
);
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
</style>
