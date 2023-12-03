<template>
  <div class="max-w-auto mx-auto">
    <h2 class="text-lg font-medium text-gray-900">Create User</h2>
    <div class="w-1/2 pt-4">
      <form @submit.prevent="save()" method="POST">
        <div class="shadow overflow-hidden rounded-md">
          <div class="px-4 py-5 bg-white p-6">
            <div class="grid grid-cols-6 gap-6">
              <!-- <div class="col-span-6 col-span-6">
                                <label for="kategori" class="block text-xs font-medium text-gray-700">Kategori</label>
                                <select id="kategori" name="kategori"
                                    class="capitalize mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs">
                                    <option v-for="item in mitra_kategori" :value="item.id">
                                        {{ item.nama }}
                                    </option>
                                </select>
                            </div> -->
              <div class="col-span-6">
                <label
                  for="nama"
                  class="block text-xs font-medium text-gray-700"
                  >Nama</label
                >
                <input
                  type="text"
                  v-model="form.nama"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="username"
                  class="block text-xs font-medium text-gray-700"
                  >Username</label
                >
                <input
                  type="text"
                  v-model="form.username"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="password"
                  class="block text-xs font-medium text-gray-700"
                  >Password</label
                >
                <input
                  type="text"
                  v-model="form.password"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="password"
                  class="block text-xs font-medium text-gray-700"
                  >Jurusan</label
                >
                <select
                  v-model="form.jurusan_id"
                  name=""
                  id=""
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                >
                  <option v-for="item in jurusan" :value="item.id">
                    {{ item.jurusan }}
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                <label
                  for="password"
                  class="block text-xs font-medium text-gray-700"
                  >Mapel</label
                >
                <select
                  v-model="form.mapel_id"
                  name=""
                  id=""
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                >
                  <option v-for="item in mapel" :value="item.id">
                    {{ item.mapel }}
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                <label
                  for="roles"
                  class="block text-xs font-medium text-gray-700"
                  >Role</label
                >
                <select
                  v-model="form.roles_id"
                  name=""
                  id=""
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                >
                  <option v-for="item in roles" :value="item.id">
                    {{ item.roles }}
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
                  :to="{ name: 'user' }"
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
import useAuth from "@/services/authentication";
import { PencilSquareIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";
import useJurusan from "../../services/data/jurusan";
import useMapel from "../../services/data/mapel";
import { onMounted, reactive } from "vue";

const { doRegister, indexRoles, roles } = useAuth();
const { index, jurusan } = useJurusan();
const { indexMapel, mapel } = useMapel();
const form = reactive({
  nama: "",
  username: "",
  password: "",
  roles_id: "",
  mapel_id: "",
  jurusan_id: "",
});

const save = async () => {
  await doRegister({ ...form });
  console.log({ ...form });
};

onMounted(() => {
  index();
  indexMapel();
  indexRoles();
});
</script>
