<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CharacterPortraits from '../CharacterPortraits.vue';

//if today is thursday, show the banner
const isThursday = ref(false);
const claimed = ref(false);

const claim = () => {
    if (!isThursday.value || claimed.value) return;
    claimed.value = true;
};

onMounted(() => {
    const today = new Date();
    const day = today.getDay();
    isThursday.value = day === 5; // 0 = Sunday, 1 = Monday, ..., 4 = Thursday
});
</script>

<template>
    <div class="bonus">
        <CharacterPortraits
            :character="isThursday && !claimed ? 'thor' : 'thorempty'"
            class="thor"
            dir="none"
        />
        <div class="info">
            <h1>THURSDAY LOGIN BONUS</h1>
            <p>
                Bettors who log in every Thursday can claim 5,000,000 beans
                courtesy of The House.
            </p>
            <button :disabled="!isThursday || claimed" @click="claim">
                {{
                    isThursday
                        ? claimed
                            ? 'BEANS CLAIMED'
                            : 'CLAM YOUR BEANS'
                        : 'TODAY IS NOT THURSDAY'
                }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bonus {
    margin: 1em 0;
    .thor {
        max-width: 125px;
        margin-right: 1em;
    }
    .info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        h1 {
            margin-top: 1rem;
            margin-bottom: 0;
            text-align: left;
            font-size: 1rem;
        }
        p {
            padding: 0.5em 0;
            font-size: 0.95rem;
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
            font-size: 1rem;
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
    }
}

@media (max-width: 700px) {
    .bonus .thor {
        margin-right: 0;
    }
}
</style>
