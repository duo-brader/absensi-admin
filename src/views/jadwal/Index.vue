<template>
  <div class="flex justify-center flex-col gap-12 items-center">
    <div class="my-12">
      <h3 class="uppercase font-bold text-xl">Jadwal Kelas</h3>

      <div
        class="flex gap-12"
        @drop="onDrop($event, 0)"
        @dragenter.prevent
        @dragover.prevent
      >
        <div
          v-for="item in getList(0)"
          :key="item.id"
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
        <th class="border p-4 border-black" v-for="item in 11" :key="item">
          {{ item }}
        </th>
      </tr>
      <tr
        class="border w-12 border-black"
        v-for="(item, rowIndex) in hari"
        :key="item.hari"
      >
        <td class="border p-12 border-black">
          {{ item.hari }}
        </td>
        <td
          v-bind:class="col"
          class="border relative p-12 border-black hover:bg-slate-200"
          v-for="(item, colIndex) in 10"
          :key="colIndex"
          @drop="onDrop($event, rowIndex, colIndex)"
          @dragenter.prevent
          @dragover.prevent
        >
          {{ rowIndex * 10 + colIndex + 1 }}
          <div
            v-for="(item, itemIndex) in getList(rowIndex, colIndex)"
            :key="itemIndex"
            class="w-full h-full absolute bg-blue-300 top-0 left-0"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            {{ item.nama }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hari = [
  { hari: "Senin" },
  { hari: "Selasa" },
  { hari: "Rabu" },
  { hari: "Kamis" },
  { hari: "Jum'at" },
];

const data = ref([
  { id: 0, nama: "A", list: 0 },
  { id: 1, nama: "B", list: 0 },
]);

function getList(row, col) {
  return data.value.filter((item) => item.list === row * 10 + col);
}

function startDrag(event, item) {
  console.log(item);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemId", item.id);
}

function onDrop(event, row, col) {
  console.log(row, col);
  const itemId = event.dataTransfer.getData("itemId");
  const item = data.value.find((item) => item.id == itemId);
  item.list = row * 10 + col;
}
</script>
