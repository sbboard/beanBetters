<script setup lang="ts">
import { computed } from 'vue';

const { description } = defineProps<{ description: string }>();

const parsedDescription = computed(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);
    return parts.map(part =>
        part.match(urlRegex)
            ? { text: part, isLink: true }
            : { text: part, isLink: false }
    );
});
</script>

<template>
    <span class="description">
        <!--NEEDS TO BE ONE LINE TO PREVENT WEIRD LINEBREAKS BC OF <PRE>-->
        <pre><template v-for="(part, index) in parsedDescription" :key="index"><a v-if="part.isLink" :href="part.text" target="_blank">{{ part.text }}</a><template v-else>{{ part.text }}</template></template></pre>
    </span>
</template>

<style lang="scss" scoped>
pre {
    text-wrap: auto;
    white-space: pre-line;
}
</style>
