<template>
  <div class="flex justify-center flex-col gap-12 items-center">
    <div class="my-12">
      <h3 class="uppercase font-bold text-xl">Jadwal Kelas</h3>

      <div
        class="flex gap-12"
        @drop="onDrop($event, 0)"
        @dragenter.prevent,
        @dragover.prevent
      >
        <div
          v-for="item in getList(0)"
          class="w-12 h-12 bg-blue-300"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.nama }}
        </div>
      </div>
    </div>
    <table class="table-auto border border-black w-80">
      <tr class="border border-black">
        <th class="border p-4 border-black" v-for="item in 11">{{ item }}</th>
      </tr>
      <tr class="border border-black" v-for="item in hari">
        <td class="border p-12 border-black">
          {{ item.hari }}
        </td>
        <td
          id="col"
          class="border p-12 border-black hover:bg-slate-200"
          v-for="(index, item) in 10"
          @drop="onDrop($event, index)"
          @dragenter.prevent,
          @dragover.prevent
        >
          {{ index }}
          <div
            v-for="(index, item) in getList(index)"
            class="w-12 h-12 bg-blue-300"
            draggable="true"
            @dragstart="startDrag($event, index)"
          >
            {{ item.nama }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const hari = [
  {
    hari: "Senin",
  },
  {
    hari: "Selasa",
  },
  {
    hari: "Rabu",
  },
  {
    hari: "Kamis",
  },
  {
    hari: "Jum'at",
  },
];

const data = ref([
  {
    id: 0,
    nama: "A",
    list: 0,
  },
  {
    id: 1,
    nama: "B",
    list: 0,
  },
]);

const uniqueId = 1;

function getList(list) {
  return data.value.filter((item) => item.list == list);
}

function startDrag(event, item) {
  console.log(item);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemId", item.id);
}

function onDrop(event, list) {
  const itemId = event.dataTransfer.getData("itemId");
  const item = data.value.find((item) => item.id == itemId);
  item.list = list;
}
</script>
