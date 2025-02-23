<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { PRICE_OF_WAGER, addCommas } from '@/composables/useEconomy';

const router = useRouter();
const title = ref('');
const description = ref('');
const endDate = ref('');
const options = ref([{ text: '' }, { text: '' }]); // Start with 2 options
const loading = ref(false);
const message = ref('');
const maxOptions = 5;
const userStore = useUserStore();

// **Validation for End Date**
const isEndDateValid = computed(() => {
    if (!endDate.value) return false;

    const selectedDate = new Date(endDate.value);
    const today = new Date();
    const minEndDate = new Date(today);
    minEndDate.setDate(today.getDate() + 1); // Move to tomorrow
    minEndDate.setHours(
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        0
    );

    const maxEndDate = new Date(today);
    maxEndDate.setMonth(today.getMonth() + 6); // Max is six months from today
    maxEndDate.setHours(
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        0
    );

    // Compare timestamps (milliseconds since epoch) to avoid precision issues
    return (
        selectedDate.getTime() >= minEndDate.getTime() &&
        selectedDate.getTime() <= maxEndDate.getTime()
    );
});

const handleDateChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;
    const localDate = new Date(input.value + 'T00:00:00'); // Parse as local date at midnight (start of the day)
    const currentTime = new Date(); // Current time in the user's local timezone
    localDate.setHours(
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds(),
        currentTime.getMilliseconds()
    );
    endDate.value = localDate.toLocaleString(); // Display in the local timezone
};

const isFormValid = computed(() => {
    return (
        title.value.trim() !== '' &&
        description.value.trim() !== '' &&
        endDate.value.trim() !== '' &&
        isEndDateValid.value &&
        options.value.length >= 2 &&
        options.value.every(option => option.text.trim() !== '') // No empty option
    );
});

const addOption = () => {
    if (options.value.length >= maxOptions) return;
    options.value.push({ text: '' });
};

const removeOption = (index: number) => {
    if (options.value.length <= 2) return;
    options.value.splice(index, 1);
};

const api = 'https://www.gang-fight.com/api/beans';
const createPoll = async () => {
    if (!isFormValid.value) return;

    loading.value = true;
    message.value = '';

    try {
        const pollData = {
            creatorId: userStore.user?._id,
            title: title.value,
            description: description.value,
            endDate: new Date(endDate.value),
            options: options.value,
        };

        const response = await axios.post(`${api}/polls/create`, pollData);
        message.value = response.data.message;
        if (message.value === 'Poll created successfully') {
            userStore.updateBeanCount(response.data.newBeanAmt);
            router.push({ path: '/bets' });
        }
    } catch (error) {
        message.value = 'Failed to create poll: ' + error;
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="create">
        <img src="/assets/dealer.jpg" />
        <h2>CREATE A NEW WAGER</h2>

        <RouterLink class="alertBox" to="/rules">
            <div class="alert">⚠️</div>
            <div>
                <strong>BEWARE:</strong> Read The Bookie Agreement before
                creating a wager and becoming a bookie. Bookies are held to a
                higher standard than regular bettors.
            </div>
        </RouterLink>
        <div
            v-if="(userStore.user?.beans || 0) < PRICE_OF_WAGER"
            class="noMoney"
        >
            <p>
                You need at least {{ addCommas(PRICE_OF_WAGER) }} BEANS to
                create a wager.
            </p>
        </div>
        <div v-else>
            <label for="title">Title</label>
            <input v-model="title" placeholder="Title" />

            <label for="description">Rules</label>
            <p>
                Describe the bet in detail. Expect your bettors to be idiots and
                be as clear as possible. They WILL misinterpret your bet.
            </p>
            <textarea
                v-model="description"
                placeholder="Description"
            ></textarea>

            <label for="endDate">End Date</label>
            <p>
                Specify what date betting will end. No more votes will be
                allowed on this day (UTC timezone).
            </p>
            <input type="date" @change="handleDateChange" />
            <p v-if="!isEndDateValid && endDate">
                End date must between tomorrow and 6 months from today.
            </p>

            <label for="options">Options</label>
            <div
                class="options"
                v-for="(option, index) in options"
                :key="index"
            >
                <input v-model="option.text" placeholder="Option text" />
                <button @click="removeOption(index)" v-if="options.length > 2">
                    ✖
                </button>
            </div>

            <button
                class="addOption"
                @click="addOption"
                :disabled="options.length >= maxOptions"
            >
                + Add Option
            </button>

            <button
                class="submit"
                @click="createPoll"
                :disabled="loading || !isFormValid"
            >
                CREATE WAGER!!!!
            </button>

            <p v-if="message">{{ message }}</p>
            <div class="alertBox">
                <div>
                    <strong>NOTE:</strong> {{ addCommas(PRICE_OF_WAGER) }} beans
                    will be taken out of your bean wallet upon wager creation.
                    These beans are used as a seed fund for your wager. This
                    will most likely be offset by the bookie tip earned on wager
                    settlement.
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.create {
    width: 400px;
    margin: 0 auto;
    max-width: 100%;
    & * {
        box-sizing: border-box;
    }
    img {
        height: 200px;
        width: 100%;
        margin-bottom: 1rem;
    }
    h2 {
        color: var(--themeColor);
        font-size: 1.2em;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    label {
        color: var(--themeColor);
    }
    input,
    textarea {
        display: block;
        width: 100%;
        resize: none;
    }
    textarea {
        height: 5em;
    }
    label {
        display: block;
        font-size: 0.9em;
        margin-top: 1rem;
        margin-bottom: 0.25rem;
    }
    p {
        display: block;
        font-size: 0.8em;
        margin-bottom: 0.25rem;
        text-align: left;
    }
    .submit {
        width: 100%;
        margin-top: 1em;
        display: block;
        background-color: var(--themeColor);
        color: black;
        outline: 0;
        border: 0;
        padding: 0.5em 0;
        font-weight: bold;
        font-size: 1.1em;
        cursor: pointer;
        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
    .addOption {
        background: none;
        border: 0;
        outline: 0;
        color: white;
        cursor: pointer;
        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
    .options {
        margin-bottom: 0.5em;
        input {
            width: calc(100% - 20px);
            display: inline-block;
            box-sizing: border-box;
        }
        button {
            width: 20px;
            outline: 0;
            border: 0;
            display: inline-block;
            box-sizing: border-box;
            background-color: none;
            color: red;
            background: none;
            cursor: pointer;
            padding: 0;
            text-align: right;
        }
    }
    .alertBox {
        flex-direction: row;
        font-size: 0.8em;
        text-align: left;
        display: flex;
        border: 1px solid var(--themeColor);
        padding: 1em;
        align-items: center;
        color: var(--themeColor);
        margin-top: 1em;
        &:hover {
            text-decoration: none;
        }
        & > div {
            display: block;
        }
        .alert {
            font-size: 2em;
            margin-right: 1rem;
        }
    }
}

.noMoney {
    margin-top: 2em;
    p {
        text-align: center;
    }
}
</style>
