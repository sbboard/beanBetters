<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const api = 'https://www.gang-fight.com/api/beans';
const poll = ref<Poll | null>(null);
const selectedOption = ref<string | null>(null);

const route = useRoute();
const router = useRouter();
const pollId = route.params.id as string;

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
        await axios.post(`${api}/polls/set-winner`, {
            pollId,
            optionId: selectedOption.value,
        });
        alert('Bet settled successfully');
        router.push({ name: 'bets' });
    } catch (error) {
        console.error('Error settling bet:', error);
        alert('Error settling the bet');
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
                    <li v-for="option in poll.options" :key="option._id">
                        <input
                            type="radio"
                            :value="option._id"
                            v-model="selectedOption"
                        />
                        <span>{{ option.text }}</span>
                    </li>
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
                <router-link to="/bets">Back to Bets</router-link>
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
    margin: 0 auto;
    & > * {
        box-sizing: border-box;
    }
    h2 {
        color: var(--themeColor);
        font-size: 1.2em;
        text-align: center;
        margin-bottom: 1rem;
    }
    h3 {
        @extend h2;
        color: white;
        margin-bottom: 0;
        text-align: center;
    }
    h4 {
        @extend h2;
        font-size: 1.1rem;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        text-align: left;
    }
    p {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 1.1rem;
        text-align: center;
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
</style>
