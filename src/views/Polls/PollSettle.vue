<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useApiStore } from '@/stores/api';
import { useUserStore } from '@/stores/user';

const api = import.meta.env.VITE_API;
const poll = ref<Poll | null>(null);
const selectedOption = ref<string | null>(null);
const selectedOptions = ref<string[]>([]); // For multiple choice polls
const apiStore = useApiStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();
const pollId = route.params.id as string;

const selectOption = (id: string) => {
    if (poll.value?.betPerWager && poll.value.betPerWager > 1) {
        selectedOptions.value = selectedOptions.value.includes(id)
            ? selectedOptions.value.filter(option => option !== id)
            : [...selectedOptions.value, id];
        return;
    }
    selectedOption.value = selectedOption.value === id ? null : id;
};

// Fetch poll data based on the poll ID
const fetchPoll = async () => {
    try {
        const response = await axios.get(`${api}/polls/${pollId}`, {
            params: { userId: userStore.user?._id },
        });
        poll.value = response.data;
    } catch (error) {
        console.error('Error fetching poll:', error);
    }
};

const headerCopy = computed(() => {
    if (poll.value?.betPerWager && poll.value.betPerWager > 1) {
        return `SELECT ALL CORRECT OPTIONS`;
    }
    return `SELECT MOST CORRECT OPTION`;
});

// Settle the bet by marking the winner
const settleBet = async () => {
    if (!selectedOption.value && !selectedOptions.value.length) return;

    try {
        const response = await axios.post(`${api}/polls/set-winner`, {
            pollId,
            optionId: !selectedOptions.value.length
                ? selectedOption.value
                : null,
            optionsArray: selectedOptions.value.length
                ? selectedOptions.value
                : null,
        });
        apiStore.fetchPolls(true);
        if (response.data.user) userStore.user = response.data.user;
        alert('Bet settled successfully');
        router.push({ name: 'bets' });
    } catch (error) {
        alert('Error settling the bet');
        console.error('Error settling bet:', error);
    }
};

onMounted(() => fetchPoll());
</script>

<template>
    <div class="settle-bet">
        <h2>SETTLE THIS WAGER</h2>
        <div v-if="poll">
            <h3>{{ poll.title }}</h3>
            <pre>{{ poll.description }}</pre>
            <hr />
            <div v-if="poll.options.length > 0">
                <h4>{{ headerCopy }}</h4>
                <ul>
                    <div
                        class="option"
                        v-for="pollOption in poll.options"
                        :class="{ isWinner: poll.winner === pollOption._id }"
                        :key="pollOption._id"
                        @click="selectOption(pollOption._id)"
                    >
                        <div
                            class="selector"
                            :class="{
                                selected:
                                    selectedOption === pollOption._id ||
                                    selectedOptions.includes(pollOption._id),
                            }"
                        >
                            <span
                                v-if="
                                    selectedOption === pollOption._id ||
                                    selectedOptions.includes(pollOption._id)
                                "
                                >🫘</span
                            >
                        </div>
                        {{ pollOption.text }}
                    </div>
                </ul>
            </div>

            <div>
                <button
                    class="submit"
                    @click="settleBet"
                    :disabled="!selectedOption && !selectedOptions.length"
                >
                    SETTLE BET!
                </button>
            </div>
        </div>

        <!-- Loading state -->
        <div v-else class="loading">
            <p>Loading poll details...</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settle-bet {
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
    & > * {
        box-sizing: border-box;
    }
    h3 {
        margin-bottom: 10px;
    }
    p {
        text-align: left;
        word-wrap: break-word;
        font-size: 1em;
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
    a {
        margin-top: 1em;
        text-align: center;
        display: block;
    }
    li {
        input {
            margin-right: 10px;
        }
        span {
            width: calc(100% - 10px);
        }
    }
}

.option .selector {
    margin-right: 10px;
}

pre {
    text-wrap: auto;
}
</style>
