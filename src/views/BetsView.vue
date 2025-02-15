<script setup lang="ts">
import useDummyInfo from '@/composables/useDummyInfo';
import Poll from '@/components/Polls/Main.vue';
import Character from '@/components/CharacterProfile.vue';

const { pollExamples } = useDummyInfo();
</script>

<template>
    <div>
        <Character :character="'king'" />
        <Poll :key="poll._id" v-for="poll in pollExamples" :poll="poll" />
    </div>
</template>

<style lang="scss"></style>
