<template>
  <div class="max-w-auto mx-auto">
    <h2 class="text-lg font-medium text-gray-900">Create Kelas</h2>
    <div class="w-1/2 pt-4">
      <form @submit.prevent="save()" method="POST">
        <div class="shadow overflow-hidden rounded-md">
          <div class="px-4 py-5 bg-white p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label
                  for="kelas"
                  class="block text-xs font-medium text-gray-700"
                  >Nama Kelas</label
                >
                <input
                  type="text"
                  v-model="form.kelas"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="kelas"
                  class="block text-xs font-medium text-gray-700"
                  >Metode Pembelajaran</label
                >
                <select
                  v-model="form.metode_pembelajaran"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id=""
                >
                  <option v-for="item in metode" :value="item.metode">
                    {{ item.metode }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50">
            <div class="flex justify-between">
              <div></div>
              <div class="flex">
                <router-link
                  :to="{ name: 'kelas' }"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                >
                  <ChevronLeftIcon class="mr-2 h-4 w-4" aria-hidden="false" />
                  Kembali
                </router-link>
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ml-2"
                >
                  <PencilSquareIcon class="mr-2 h-4 w-4" aria-hidden="false" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { PencilSquareIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";
import useKelas from "../../services/data/kelas";

const { store } = useKelas();
const metode = [
  {
    metode: "pjj",
  },
  {
    metode: "pkk",
  },
];

const form = reactive({
  kelas: "",
  metode_pembelajaran: "",
});

const save = async () => {
  store({ ...form });
};
</script>
