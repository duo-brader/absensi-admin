<template>
    <div class="mx-auto">
        <h2 class="text-lg font-medium text-gray-900">Pengaturan</h2>
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            <a :href="item.href" v-for="(item, index) in menu" :key="index"
                class="relative bg-white py-4 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                    <div class="absolute rounded-md bg-indigo-500 p-3">
                        <component :is="item.icon" class="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <p class="ml-20 truncate text-sm font-medium text-gray-500">
                        {{ item.name }}
                    </p>
                </dt>
                <dd class="ml-20 items-baseline pb-4">
                    <p class="text-sm font-semibold text-slate-900">
                        Value
                    </p>
                </dd>
            </a>
        </dl>
        <div class="p-4">
            <BarChart :data="chartData" />
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import BarChart from "../components/BarChart.vue";
import {
    RectangleGroupIcon,
    BuildingStorefrontIcon,
    UserIcon,
    AdjustmentsHorizontalIcon,
    PhotoIcon,
    AcademicCapIcon,
    FingerPrintIcon,
    BookOpenIcon,
} from "@heroicons/vue/24/outline";

const chartData = ref([10, 20, 30, 40, 40, 50, 30, 80, 10, 20, 30, 40, 40, 50, 30, 80, 100, 200]); // Example data
const menu = [
    {
        name: "User",
        icon: UserIcon,
    },
    {
        name: "Kelas",
        icon: AcademicCapIcon,
    },
    {
        name: "Mapel",
        icon: BookOpenIcon
    },
    {
        name: "Absensi",
        icon: FingerPrintIcon
    },
];
</script>
