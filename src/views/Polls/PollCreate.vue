<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useEconomy, PRICE_OF_WAGER } from '@/composables/useEconomy';
import { useApiStore } from '@/stores/api';

const { addCommas } = useEconomy();
const router = useRouter();
const title = ref('');
const description = ref('');
const endDate = ref('');
const settleDate = ref('');
const pricePerShare = ref(PRICE_OF_WAGER);
const seed = ref(PRICE_OF_WAGER);
const options = ref([{ text: '' }, { text: '' }]); // Start with 2 options
const loading = ref(false);
const message = ref('');
const maxOptions = 15;
const userStore = useUserStore();
const apiStore = useApiStore();
const settleDateRef: Ref<HTMLInputElement | null> = ref(null);
const pollType = ref('single');
const betPerWager = ref(2);

watch(pricePerShare, () => {
    if (seed.value >= pricePerShare.value) return;
    seed.value = pricePerShare.value;
});

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
const isSettleDateValid = computed(() => {
    if (!settleDate.value) return false;

    //must be the same day or within 2 months of the endDate
    const selectedDate = new Date(settleDate.value);
    const today = new Date();
    const minSettleDate = new Date(endDate.value);
    minSettleDate.setHours(
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        0
    );

    const maxSettleDate = new Date(endDate.value);
    maxSettleDate.setMonth(minSettleDate.getMonth() + 2); // Max is two months from the end date
    maxSettleDate.setHours(
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        0
    );

    // Compare timestamps (milliseconds since epoch) to avoid precision issues
    return (
        selectedDate.getTime() >= minSettleDate.getTime() &&
        selectedDate.getTime() <= maxSettleDate.getTime()
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
    if (!settleDate.value || new Date(settleDate.value) < localDate) {
        settleDate.value = localDate.toLocaleString();
        if (!settleDateRef.value) return;
        const date = new Date(settleDate.value);
        const formattedDate = date.toISOString().split('T')[0]; // Formats to "YYYY-MM-DD"
        settleDateRef.value.value = formattedDate;
    }
};

const handleSettleDateChange = (event: Event) => {
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
    settleDate.value = localDate.toLocaleString(); // Display in the local timezone
};

const isFormValid = computed(() => {
    return (
        pricePerShare.value >= PRICE_OF_WAGER &&
        seed.value >= pricePerShare.value &&
        userStore.user?.beans &&
        seed.value <= userStore.user?.beans &&
        title.value.trim() !== '' &&
        description.value.trim() !== '' &&
        endDate.value.trim() !== '' &&
        isEndDateValid.value &&
        isSettleDateValid.value &&
        options.value.length >= 2 &&
        options.value.every(option => option.text.trim() !== '') && // No empty option
        (pollType.value === 'single' || betPerWager.value >= 2) &&
        (pollType.value === 'single' ||
            betPerWager.value <= Math.floor(options.value.length / 2))
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

const api = import.meta.env.VITE_API;
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
            settleDate: new Date(settleDate.value),
            options: options.value,
            pricePerShare: pricePerShare.value,
            seed: seed.value,
            betPerWager: undefined as number | undefined,
        };

        if (pollType.value === 'multi') {
            pollData.betPerWager = betPerWager.value;
        }

        const response = await axios.post(`${api}/polls/create`, pollData);
        message.value = response.data.message;
        if (message.value === 'Poll created successfully') {
            userStore.updateBeanCount(response.data.newBeanAmt);
            apiStore.fetchPolls(true);
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
            <p>Not enough beans for minimum seed</p>
        </div>
        <div v-else-if="!userStore.checkItem('bookie license')" class="noMoney">
            <p>You need a bookie license to create a wager</p>
        </div>
        <div v-else>
            <label for="title">Title</label>
            <input v-model="title" placeholder="Title" />

            <label for="description">Additional Information</label>
            <p>
                Describe the bet in detail. Expect your bettors to be idiots and
                be as clear as possible. They WILL misinterpret your bet.
            </p>
            <textarea
                v-model="description"
                placeholder="Description"
            ></textarea>

            <label for="endDate">Betting Deadline</label>
            <p>
                Specify what date betting will end.<br />End date must between
                tomorrow and 6 months from today.<br />Time is based on whatever
                time it is when you create wager.
            </p>
            <input type="date" @change="handleDateChange" />
            <p v-if="!isEndDateValid && endDate">
                Settle date is not currently between tomorrow and 6 months from
                today!
            </p>

            <label for="endDate">Settle Deadline</label>
            <p>
                Specify what date the bet will be settled.<br />Must be the day
                of, or within 2 months of the end date.<br />Time is based on
                whatever time it is when you create wager.
            </p>
            <input
                ref="settleDateRef"
                type="date"
                @change="handleSettleDateChange"
            />
            <p v-if="!isSettleDateValid && settleDate">
                Settle date is not currently within valid timeframe.
            </p>

            <label for="pricePerShare">Price Per Share</label>
            <p>How much a single bet costs. Minimum 500,000 beans.</p>
            <input
                type="number"
                v-model="pricePerShare"
                :minimum="PRICE_OF_WAGER"
                :value="pricePerShare"
            />
            <p>Comma Helper: {{ addCommas(pricePerShare) }} BEANS</p>

            <label for="pricePerShare">Bean Seed</label>
            <p>
                How many beans are put in initially.<br />You must have this
                amount of beans in your account.<br />Will be matched by the
                Soda Enjoyer Seed Grant.<br />Minimum 500,000 beans.
            </p>
            <input
                type="number"
                v-model="seed"
                :min="pricePerShare"
                :max="userStore.user?.beans || PRICE_OF_WAGER"
                :value="seed"
            />
            <p>Comma Helper: {{ addCommas(seed) }} BEANS</p>
            <p v-if="seed > (userStore.user?.beans || 0)">
                You cannot afford this seed amount!
            </p>

            <label for="options">Options</label>
            <p>Between 2 and 15</p>
            <div
                class="options"
                v-for="(option, index) in options"
                :key="index"
            >
                <input
                    v-model="option.text"
                    placeholder="Option text"
                    maxlength="50"
                />
                <button
                    tabindex="-1"
                    @click="removeOption(index)"
                    v-if="options.length > 2"
                >
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

            <label for="pollType">Poll Type</label>
            <p>
                Choose the type of poll you want to create.<br />Add at least 4
                options for multi bet.
            </p>
            <select v-model="pollType">
                <option value="single">Single</option>
                <option v-if="options.length > 3" value="multi">
                    Multi Bet
                </option>
            </select>

            <template v-if="pollType === 'multi'">
                <label for="betPerWager">Bets Per Wager</label>
                <p>
                    How many bets can be made per wager. Minimum 2. Maximum is
                    half the amount of options.
                </p>
                <input
                    type="number"
                    v-model="betPerWager"
                    :min="2"
                    :max="Math.floor(options.length / 2)"
                />
            </template>

            <button
                class="submit"
                @click="createPoll"
                :disabled="loading || !isFormValid"
            >
                CREATE WAGER!!!!
            </button>

            <p v-if="message">{{ message }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.create {
    width: 500px;
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
        resize: vertical;
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
