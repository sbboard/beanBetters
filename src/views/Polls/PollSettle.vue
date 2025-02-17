<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const poll = ref<Poll | null>(null);
const selectedOption = ref<string | null>(null);

const route = useRoute();
const router = useRouter();
const pollId = route.params.id as string;

// Fetch poll data based on the poll ID
const fetchPoll = async () => {
    try {
        const response = await axios.get(`/api/polls/${pollId}`);
        poll.value = response.data.poll;
    } catch (error) {
        console.error('Error fetching poll:', error);
    }
};

// Settle the bet by marking the winner
const settleBet = async () => {
    if (!selectedOption.value) return;

    try {
        await axios.post(`/api/polls/set-winner`, {
            pollId,
            winnerId: selectedOption.value,
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
        <h2>Settle Bet</h2>
        <div v-if="poll" class="poll-details">
            <h3>{{ poll.title }}</h3>
            <p>{{ poll.description }}</p>
            <p><strong>End Date:</strong> {{ poll.endDate }}</p>

            <div v-if="poll.options.length > 0">
                <h4>Poll Options</h4>
                <ul>
                    <li v-for="option in poll.options" :key="option._id">
                        <label>
                            <input
                                type="radio"
                                :value="option._id"
                                v-model="selectedOption"
                            />
                            {{ option.text }} ({{ option.betters.length }}
                            bettors)
                        </label>
                    </li>
                </ul>
            </div>

            <div class="action-buttons">
                <button
                    @click="settleBet"
                    :disabled="!selectedOption"
                    class="btn-settle"
                >
                    Settle Bet
                </button>
                <router-link to="/bets" class="btn-back"
                    >Back to Bets</router-link
                >
            </div>
        </div>

        <!-- Loading state -->
        <div v-else class="loading">
            <p>Loading poll details...</p>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
