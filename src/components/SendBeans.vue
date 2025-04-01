<script setup lang="ts">
import { useEconomy } from '@/composables/useEconomy';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { ref } from 'vue';

const api = import.meta.env.VITE_API;
const userStore = useUserStore();
const { addCommas } = useEconomy();

const beansToSend = ref(500000);
const recipient = ref('');
const message = ref('');
const feedback = ref('');

const isValid = () => {
    if (beansToSend.value < 500000 || recipient.value === '') return false;
    if (beansToSend.value > (userStore.user?.beans || 0)) return false;
    if (recipient.value === userStore.user?.name) return false;
    if ((userStore.user?.debt || 0) > 0) return false;
    return true;
};

async function sendBeans() {
    try {
        const response = await axios.post(`${api}/store/send-beans`, {
            userId: userStore.user?._id,
            userKey: userStore.key,
            recipientName: recipient.value,
            amount: beansToSend.value,
            message: message.value,
        });
        userStore.user = response.data.user;
        beansToSend.value = 500000;
        recipient.value = '';
        message.value = '';
        feedback.value = 'Beans transfered!';
    } catch (error) {
        console.error('Error sending beans:', error);
        if (axios.isAxiosError(error)) {
            feedback.value = 'Error: ' + error.response?.data.message;
            return null;
        }
    }
}
</script>

<template>
    <div>
        <div class="transfer">
            <div class="bag">
                <img :src="`/assets/items/bag.png`" />
            </div>
            <div class="info">
                <div>
                    Transfer
                    <input
                        class="toSend"
                        type="number"
                        min="500000"
                        :max="userStore.user?.beans || 0"
                        step="500000"
                        v-model="beansToSend"
                    />
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
                    <input
                        v-model="message"
                        placeholder="Message"
                        maxlength="30"
                    />
                </div>
            </div>
            <button v-if="userStore.user?.debt" disabled>IN DEBT</button>
            <button v-else @click="sendBeans" :disabled="!isValid()">
                TRANSFER
            </button>
        </div>
        <div style="text-align: right">{{ feedback }}</div>
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
        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
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
