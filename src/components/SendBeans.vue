<script setup lang="ts">
import { useEconomy } from '@/composables/useEconomy';
import { ref } from 'vue';
const { addCommas } = useEconomy();

const beansToSend = ref(0);
const recipient = ref('');
const message = ref('');

function sendBeans() {
    console.log('Sending beans:', beansToSend.value, 'to', recipient.value);
    console.log('Message:', message.value);
}
</script>

<template>
    <div class="transfer">
        <div class="bag">
            <img :src="`/assets/items/bag.png`" />
        </div>
        <div class="info">
            <div>
                Transfer
                <input class="toSend" type="number" v-model="beansToSend" />
                beans to
                <input
                    type="text"
                    placeholder="Recipient's Username"
                    v-model="recipient"
                />
            </div>
            <div class="helper">
                Comma Helper: {{ addCommas(beansToSend) }} BEANS
            </div>
            <div class="msg">
                Message:
                <input v-model="message" placeholder="Message" maxlength="20" />
            </div>
        </div>
        <button @click="sendBeans">TRANSFER</button>
    </div>
</template>

<style lang="scss">
.transfer {
    display: flex;
    position: relative;
    margin-bottom: 1em;
    flex-direction: row;
    input {
        background-color: transparent;
        border: 0;
        outline: 0;
        color: var(--themeColor);
        border-bottom: 1px solid var(--themeColor);
        text-align: right;
        flex: 1;
        margin-left: 1em;
        &.toSend {
            margin-right: 1em;
        }
        &::placeholder {
            color: var(--themeColorOpaque);
        }
    }
    .info {
        margin-right: 1em;
        flex: 1;
        & > div {
            display: flex;
        }
        .msg {
            margin-top: 0.5em;
            width: 100%;
            resize: none;
            box-sizing: border-box;
            display: flex;
            input {
                flex: 1;
            }
        }
    }
    button {
        border: 0;
        outline: 0;
        background-color: var(--themeColor);
        border: 1px solid var(--themeColor);
        color: black;
        padding: 0.5rem 1.5rem;
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
    }
}

.bag {
    display: flex;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        image-rendering: pixelated;
        width: 60px;
        padding: 0 10px;
    }
}

.helper {
    font-size: 0.75em;
    margin-top: 0.5em;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}

@media (max-width: 700px) {
    .transfer {
        flex-direction: column;
        button {
            margin-top: 1em;
        }
        .info {
            margin-right: 0;
        }
        .bag {
            display: none;
        }
        input {
            min-width: 20%;
            margin-left: 0.5em;
            &.toSend {
                margin-right: 0.5em;
            }
        }
    }
}
</style>
