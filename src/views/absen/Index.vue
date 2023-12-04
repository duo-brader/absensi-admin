<template>
    <div class="mx-auto">
        <h2 class="text-lg font-medium text-gray-900">Absen</h2>
        <div class="flex items-center flex-col lg:flex-row lg:justify-end gap-3 mt-3">
            <!-- <router-link :to="{ name: 'user-create' }"
                class="flex items-center gap-2 text-sm px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white">
                <PlusIcon class="w-5" /> Create
            </router-link> -->
        </div>
    </div>
    <div class="max-w-auto mx-auto">
        <div class="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-indigo-500">
                    <tr>
                        <th scope="col" class="py-2.5 text-left text-xs font-semibold text-white sm:pl-6">
                            No.
                        </th>
                        <th scope="col" class="pr-3 py-2.5 text-left text-xs font-semibold text-white">
                            Guru Umum
                        </th>
                        <th scope="col" class="px-3 py-2.5 text-left text-xs font-semibold text-white">
                            Guru Produktif
                        </th>
                        <!-- <th scope="col" class="px-3 py-2.5 text-left text-xs font-semibold text-white">
                            Persentase
                        </th> -->
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="item in absen">
                        <td class="w-full max-w-0 py-2 text-xs font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                            {{ i++ }}
                        </td>
                        <td class="pr-3 py-2 text-xs text-gray-500 lg:table-cell">
                            {{ item.persentaseUmum }} %
                        </td>
                        <td class="px-3 py-2 text-xs text-gray-500 lg:table-cell">
                            {{ item.persentaseProduktif }} %
                        </td>
                        <!-- <td class="px-3 py-2 text-xs text-gray-500 lg:table-cell">
                            {{ item.persentaseUmum }} %
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import {
    PencilSquareIcon,
    PlusIcon,
} from "@heroicons/vue/24/outline";
import { onMounted, reactive, ref } from "vue";
import useAbsen from "../../services/data/absen"

const {absen, indexAbsen} = useAbsen()
let i = 1;

onMounted(() => {
    indexAbsen()
})
</script>