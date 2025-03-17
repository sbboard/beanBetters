<script setup lang="ts">
import toRoman from '../../utils/toRoman';
const { lawsBroken } = defineProps<{ lawsBroken: string[] }>();

const parseMessage = (numbers: string[]): string => {
    const laws = numbers.map(law => parseInt(law));

    const romanizedLaws = laws
        .map((num: number) => {
            const romanNumeral = toRoman(num);
            return `<a href="/rules#${num}" class="law-link">${romanNumeral}</a>`;
        })
        .join(', ');

    return `Rules Broken: ${romanizedLaws}.`;
};
</script>

<template>
    <div class="illegal">
        <div>WAGER SHUT DOWN</div>
        <div class="laws" v-html="parseMessage(lawsBroken)"></div>
    </div>
</template>

<style lang="scss" scoped>
.illegal {
    position: absolute;
    inset: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--themeColor);
    background: #000000d2;
    font-weight: bold;
    pointer-events: all;
    flex-direction: column;
    padding: 25px;
    text-align: center;
    & > div {
        font-size: 1.5em;
    }
    .laws {
        margin-top: 0.25em;
        color: white;
        padding-bottom: 1em;
    }
}
</style>
