<script setup lang="ts">
import useDummyInfo from '@/composables/useDummyInfo';
import Poll from '@/components/Polls/Main.vue';
import { ref } from 'vue';
import Character from '@/components/Character.vue';

const sortBy = ref('date');
const sortDir = ref('asc');
const showFinished = ref(false);

const { pollExamples } = useDummyInfo();
</script>

<template>
    <div>
        <Character :character="'king'" />
        <!-- <Filters /> -->
        <Poll v-for="poll in pollExamples" :poll="poll" />
    </div>
</template>

<style lang="scss"></style>
