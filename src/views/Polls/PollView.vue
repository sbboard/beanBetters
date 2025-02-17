<script setup lang="ts">
import Poll from '@/components/Polls/PollMain.vue';
import Character from '@/components/CharacterProfile.vue';
import { onMounted, ref } from 'vue';
import { getAllPolls } from '@/composables/usePolls';

const polls = ref<Poll[] | null>(null);

onMounted(async () => {
    polls.value = await getAllPolls();
    console.log(polls);
});
</script>

<template>
    <div>
        <Character :character="'king'" />
        <template v-if="polls && polls.length">
            <Poll :key="poll._id" v-for="poll in polls" :poll="poll"
        /></template>
    </div>
</template>

<style lang="scss"></style>
