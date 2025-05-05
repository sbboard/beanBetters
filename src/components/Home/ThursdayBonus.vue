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
