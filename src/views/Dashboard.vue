<template>
    <div class="mx-auto">
        <h2 class="text-lg font-medium text-gray-900">Dashboard</h2>
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            <a v-for="item in mergedData" :key="item.name"
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
                    <p v-if="item.value === 1 && absen.data" class="text-sm font-semibold text-slate-900">
                        {{ absen.data.persentase }} %
                    </p>
                    <p v-else class="text-sm font-semibold text-slate-900">
                        kosong
                    </p>
                </dd>
            </a>
        </dl>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useAbsen from "../services/data/absen";
import { UserIcon, AcademicCapIcon, BookOpenIcon, FingerPrintIcon } from "@heroicons/vue/24/outline";

const { index, absen } = useAbsen();
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
        icon: BookOpenIcon,
    },
    {
        name: "Absensi Umum",
        icon: FingerPrintIcon,
        value: 1,
    },
    {
        name: "Absensi Produktif",
        icon: FingerPrintIcon,
        value: 2,
    },
];

const mergedData = ref([]);

onMounted(async () => {
    await index();
    mergedData.value = [...menu, ...(absen.data ? [absen.data] : [])];
});

</script>
