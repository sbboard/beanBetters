<script setup lang="ts">
import { Line } from 'vue-chartjs';
import type { ChartData } from 'chart.js';
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
            data: winner[sort.value].map((data, i) => {
                const value = 'beans' in data ? data.beans : 10 - i;
                return {
                    value,
                    name: data.name,
                };
            }),
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
    const hue = Math.floor(Math.random() * 360);
    const lightness = Math.floor(Math.random() * 20) + 50;
    return `hsl(${hue}, 100%, ${lightness}%)`;
};

const data: ComputedRef<ChartData<'line'>> = computed(() => {
    const data = {
        labels,
        datasets: [] as {
            label: string;
            data: (number | null)[];
            borderColor: string;
            backgroundColor: string;
            fill: boolean;
        }[],
    };

    const names = computed(() => {
        return filteredData.value
            .map(data => data.data.map(data => data.name))
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index);
    });

    names.value.forEach(name => {
        const color = randomHex();
        const dataset = {
            label: name,
            data: filteredData.value
                .map(data => {
                    const entry = data.data.find(data => data.name === name);
                    return entry ? entry.value : -1;
                })
                .reverse(),
            borderColor: color,
            backgroundColor: color,
            fill: false,
        };
        data.datasets.push(dataset);
    });

    return data;
});

const min = computed(() => {
    if (sort.value === 'beans') {
        const values = filteredData.value
            .map(data => data.data.map(data => data.value))
            .flat();
        return Math.min(...values);
    }
    return 1;
});
const max = computed(() => {
    if (sort.value === 'beans') {
        const values = filteredData.value
            .map(data => data.data.map(data => data.value))
            .flat();
        return Math.max(...values);
    }
    return 10;
});
const options = computed(() => {
    return {
        animation: { duration: 0 },
        responsive: true,
        plugins: { legend: { display: false } },
        elements: { point: { radius: 2 } },
        scales: {
            y: {
                max: max.value,
                min: min.value,
            },
        },
    };
});
</script>

<template>
    <Line :data :options />
</template>

<style lang="scss" scoped></style>
