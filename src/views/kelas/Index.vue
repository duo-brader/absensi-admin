<template>
  <div class="mx-auto">
    <h2 class="text-lg font-medium text-gray-900">Kelas</h2>
    <div
      class="flex items-center flex-col lg:flex-row lg:justify-end gap-3 mt-3"
    >
      <router-link
        :to="{ name: 'kelas-create' }"
        class="flex items-center gap-2 text-sm px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white"
      >
        <PlusIcon class="w-5" /> Create
      </router-link>
    </div>
  </div>
  <div class="max-w-auto mx-auto">
    <div
      class="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
    >
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-indigo-500">
          <tr>
            <th
              scope="col"
              class="py-2.5 text-center text-xs font-semibold text-white sm:pl-6"
            >
              No.
            </th>
            <th
              scope="col"
              class="pr-3 py-2.5 text-center text-xs font-semibold text-white"
            >
              Kelas
            </th>
            <th
              scope="col"
              class="px-3 py-2.5 text-center text-xs font-semibold text-white"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody class="divide-y text-center divide-gray-200 bg-white">
          <tr v-for="item in kelas">
            <td
              class="w-full max-w-0 py-2 text-xs font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
            >
              {{ i++ }}
            </td>
            <td class="pr-3 py-2 text-xs text-gray-500 lg:table-cell">
              {{ item.kelas }}
            </td>
            <td class="pl-3 py-2 text-xs text-gray-500 lg:table-cell">
              <div class="flex justify-center gap-5">
                <router-link
                  :to="{ name: 'kelas-edit', params: { id: item.id } }"
                  class="flex gap-2 text-sm px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <PencilSquareIcon class="w-5" /> Edit
                </router-link>
                <button
                  @click="destroy(item.id)"
                  class="flex gap-2 text-sm px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  <PencilSquareIcon class="w-5" /> Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { PencilSquareIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { onMounted, reactive, ref } from "vue";
import useKelas from "../../services/data/kelas";

const { index, kelas, destroy } = useKelas();
let i = 1;

onMounted(() => {
  index();
});
</script>
