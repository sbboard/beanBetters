<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const title = ref('');
const description = ref('');
const endDate = ref('');
const options = ref([{ text: '' }, { text: '' }]); // Start with 2 options
const loading = ref(false);
const message = ref('');
const maxOptions = 5;

// **Validation for End Date**
const isEndDateValid = computed(() => {
    if (!endDate.value) return false;

    const selectedDate = new Date(endDate.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for proper comparison
    const minEndDate = new Date(today);
    minEndDate.setDate(today.getDate() + 1); // Must be at least tomorrow
    const maxEndDate = new Date(today);
    maxEndDate.setMonth(today.getMonth() + 6); // Max is six months from today

    return selectedDate >= minEndDate && selectedDate <= maxEndDate;
});

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
            creatorId: useUserStore().user?._id,
            title: title.value,
            description: description.value,
            endDate: new Date(endDate.value),
            options: options.value,
        };

        const response = await axios.post(`${api}/polls/create`, pollData);
        message.value = response.data.message;
        if (message.value === 'Poll created successfully') {
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
        <label for="title">Title</label>
        <input v-model="title" placeholder="Title" />

        <label for="description">Description</label>
        <p>
            Describe the bet in detail. Expect your bettors to be idiots and be
            as clear as possible. They WILL misinterpret your bet.
        </p>
        <textarea v-model="description" placeholder="Description"></textarea>

        <label for="endDate">End Date</label>
        <p>
            Specify what date betting will end. No more votes will be allowed on
            this day (UTC timezone).
        </p>
        <input type="date" v-model="endDate" />
        <p v-if="!isEndDateValid && endDate">
            End date must between tomorrow and 6 months from today.
        </p>

        <label for="options">Options</label>
        <div class="options" v-for="(option, index) in options" :key="index">
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
    </div>
</template>

<style lang="scss" scoped>
.create {
    width: 400px;
    margin: 0 auto;
    & > * {
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
        margin-bottom: 1rem;
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
}
</style>
