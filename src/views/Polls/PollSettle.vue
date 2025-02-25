<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useApiStore } from '@/stores/api';
import { useUserStore } from '@/stores/user';

const api = 'https://www.gang-fight.com/api/beans';
const poll = ref<Poll | null>(null);
const selectedOption = ref<string | null>(null);
const apiStore = useApiStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();
const pollId = route.params.id as string;

const selectOption = (id: string) => {
    selectedOption.value = selectedOption.value === id ? null : id;
};

// Fetch poll data based on the poll ID
const fetchPoll = async () => {
    try {
        const response = await axios.get(`${api}/polls/${pollId}`);
        poll.value = response.data;
    } catch (error) {
        console.error('Error fetching poll:', error);
    }
};

// Settle the bet by marking the winner
const settleBet = async () => {
    if (!selectedOption.value) return;
    try {
        const response = await axios.post(`${api}/polls/set-winner`, {
            pollId,
            optionId: selectedOption.value,
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

// Fetch poll on mount
onMounted(() => fetchPoll());
</script>

<template>
    <div class="settle-bet">
        <h2>SETTLE THIS BET</h2>
        <div v-if="poll">
            <h3>{{ poll.title }}</h3>
            <p>{{ poll.description }}</p>
            <hr />
            <div v-if="poll.options.length > 0">
                <h4>Which was correct?</h4>
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
                                selected: selectedOption === pollOption._id,
                            }"
                        >
                            <span v-if="selectedOption === pollOption._id"
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
                    :disabled="!selectedOption"
                >
                    Settle Bet
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
    width: 400px;
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
</style>
