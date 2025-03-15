<script setup lang="ts">
const { lawsBroken } = defineProps<{ lawsBroken: string[] }>();

const parseMessage = (numbers: string[]): string => {
    const laws = numbers.map(law => parseInt(law));
    const toRoman = (num: number): string => {
        const romanMap: [number, string][] = [
            [1000, 'M'],
            [900, 'CM'],
            [500, 'D'],
            [400, 'CD'],
            [100, 'C'],
            [90, 'XC'],
            [50, 'L'],
            [40, 'XL'],
            [10, 'X'],
            [9, 'IX'],
            [5, 'V'],
            [4, 'IV'],
            [1, 'I'],
        ];
        let result = '';
        for (const [value, numeral] of romanMap) {
            while (num >= value) {
                result += numeral;
                num -= value;
            }
        }
        return result;
    };

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
