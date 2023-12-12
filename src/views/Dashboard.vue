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
                    <p v-if="item.value === 1" class="text-sm font-semibold text-slate-900">
                        <!-- {{ absen.data.persentaseUmum }} % -->
                        kosong
                    </p>
                    <p v-if="item.value === 2" class="text-sm font-semibold text-slate-900">
                        <!-- {{ absen.data.persentaseProduktif }} % -->
                        kosong
                    </p>
                    <p v-if="item.value === 3" class="text-sm font-semibold text-slate-900">
                        <!-- {{ absen.data.totalAbsen }} % -->
                        kosong
                    </p>
                    <p v-if="item.value === 4 && user" class="text-sm font-semibold text-slate-900">
                        {{ user }}
                    </p>
                    <p v-if="item.value === 5 && kelas" class="text-sm font-semibold text-slate-900">
                        {{ kelas }}
                    </p>
                    <p v-if="item.value === 6 && mapel" class="text-sm font-semibold text-slate-900">
                        {{ mapel }}
                    </p>
                </dd>
            </a>
        </dl>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { UserIcon, AcademicCapIcon, BookOpenIcon, FingerPrintIcon } from "@heroicons/vue/24/outline";
import useAbsen from "../services/data/absen";
import useUser from "../services/data/user";
import useKelas from "../services/data/kelas";
import useMapel from "../services/data/mapel";

const { absen, totalAbsen } = useAbsen();
const { kelas, totalKelas } = useKelas();
const { user, totalUser } = useUser();
const { mapel, totalMapel } = useMapel();
const menu = [
    {
        name: "Mapel",
        icon: BookOpenIcon,
        value: 6,
    },
    {
        name: "Kelas",
        icon: AcademicCapIcon,
        value: 5,
    },
    {
        name: "User",
        icon: UserIcon,
        value: 4,
    },
    // {
    //     name: "Absensi",
    //     icon: FingerPrintIcon,
    //     value: 3,
    // },
    {
        name: "Absensi Produktif",
        icon: FingerPrintIcon,
        value: 2,
    },
    {
        name: "Absensi Umum",
        icon: FingerPrintIcon,
        value: 1,
    },
];

const mergedData = ref([]);

onMounted(async () => {
    await totalAbsen();
    await totalUser();
    await totalKelas();
    await totalMapel();
    mergedData.value = [...menu, ...(absen.data ? [absen.data] : []), ...(user.data ? [user.data] : []), ...(kelas.data ? [kelas.data] : []), ...(mapel.data ? [mapel.data] : [])];
});

</script>
