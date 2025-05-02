<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CharacterPortraits from '../CharacterPortraits.vue';

//if today is thursday, show the banner
const isThursday = ref(false);

onMounted(() => {
    const today = new Date();
    const day = today.getDay();
    isThursday.value = day === 5; // 0 = Sunday, 1 = Monday, ..., 4 = Thursday
});
</script>

<template>
    <div class="bonus">
        <CharacterPortraits
            :character="isThursday ? 'thor' : 'thorempty'"
            class="thor"
            dir="none"
        />
    </div>
</template>

<style lang="scss" scoped>
.bonus {
    border: 1px solid var(--themeColor);
    margin-bottom: 1em;
    .thor {
        max-width: 125px;
        border-radius: 0 !important;
    }
}
</style>
