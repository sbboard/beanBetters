<script setup lang="ts">
import { Line } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';
import ranks from '@/utils/rankInfo';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { useApiStore } from '@/stores/api';
import { computed, type ComputedRef } from 'vue';
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
);

const apiStore = useApiStore();
const props = defineProps<{ sort: 'beans' | 'wins' }>();
const sort = computed(() => props.sort);

const filteredData = computed(() => {
    return apiStore.winners.chart.map(winner => {
        return {
            date: winner.date,
            names: winner[sort.value],
        };
    });
});

const labels = filteredData.value
    .map(data => {
        const date = new Date(data.date);
        return date.toDateString().slice(4, 10);
    })
    .reverse();

const randomHex = () => {
    const baseHue = 72;
    const hueVariation = Math.floor(Math.random() * 50) - 25;
    const saturation = Math.floor(Math.random() * 40) + 60;
    const lightness = Math.floor(Math.random() * 40) + 40;
    return `hsl(${baseHue + hueVariation}, ${saturation}%, ${lightness}%)`;
};

const data: ComputedRef<ChartData<'line'>> = computed(() => {
    const data = {
        labels,
        datasets: [] as {
            label: string;
            data: (number | null)[];
            borderColor: string;
            backgroundColor: string;
        }[],
    };

    const names = computed(() => {
        return filteredData.value
            .map(data => data.names)
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index);
    });

    names.value.forEach(name => {
        const color = randomHex();
        const dataset = {
            label: name,
            data: filteredData.value
                .map(data => {
                    return data.names.indexOf(name) + 1 || 11;
                })
                .reverse(),
            borderColor: color,
            backgroundColor: color,
            pointRadius: 5,
        };
        data.datasets.push(dataset);
    });

    return data;
});

const FONT_SIZE = 14;
const options: ComputedRef<ChartOptions<'line'>> = computed(() => ({
    animation: { duration: 0 },
    responsive: true,
    plugins: {
        legend: { display: false },
        tooltip: {
            bodyAlign: 'center',
            bodyFont: {
                size: FONT_SIZE,
            },
            displayColors: false,
            callbacks: {
                title: () => '',
                beforeLabel: context => {
                    if (sort.value === 'wins') return '';
                    else {
                        return (
                            ranks[context.parsed.y - 1].emoji +
                            ranks[context.parsed.y - 1].title
                        );
                    }
                },
                label: context => {
                    const label = context.dataset.label || '';
                    return label ?? null;
                },
            },
        },
    },
    scales: {
        y: {
            max: 10,
            min: 1,
            reverse: true,
            grid: {
                color: '#daff3c50',
            },
            ticks: {
                color: '#daff3c',
                padding: 0,
                font: {
                    size: FONT_SIZE,
                },
            },
            offset: true,
        },
        x: {
            grid: {
                color: '#daff3c50',
            },
            ticks: {
                color: '#daff3c',
                padding: 0,
                font: {
                    size: FONT_SIZE,
                },
            },
        },
    },
}));
</script>

<template>
    <Line :data :options style="margin-bottom: 2em; margin-top: 2em;" />
</template>

<style lang="scss" scoped></style>
