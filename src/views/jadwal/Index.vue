<template>
  <div class="flex justify-between">
    <router-link :to="{ name: 'kelas' }"
      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-br-md text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
      <ChevronLeftIcon class="mr-2 h-4 w-4" aria-hidden="false" />
      Kembali
    </router-link>
    <button @click="exportPDF" class="bg-red-500 text-white px-12 py-2 rounded-bl-md">
      Export PDF
    </button>
  </div>
  <div class="flex justify-center flex-col gap-5 items-center">
    <div ref="tableToExport">
      <h3 class="uppercase text-center font-bold text-xl">
        Jadwal Kelas {{ kelas.kelas }}
      </h3>
      <table ref="tableToExport" class="table-auto border m-10 border-black w-80">
        <tr class="border border-black">
          <th class="border p-4 border-black" v-for="item in 11" :key="item">
            {{ item }}
          </th>
        </tr>
        <tr class="border w-12 border-black" v-for="(item, rowIndex) in hari" :key="item.hari">
          <td class="border p-12 border-black">
            {{ item.hari }}
          </td>
          <td v-bind:class="col" class="border relative p-12 border-black hover:bg-slate-200"
            v-for="(item, colIndex) in 10" :key="colIndex" @drop="onDrop($event, rowIndex, colIndex)" @dragenter.prevent
            @dragover.prevent>
            <!-- {{ rowIndex * 10 + colIndex + 1 }} -->
            <div v-for="(item, itemIndex) in getList(rowIndex, colIndex)" :key="itemIndex"
              class="w-full h-full flex font-bold text-center text-base justify-center flex-col items-center absolute bg-blue-300 top-0 left-0"
              draggable="true" @dragstart="startDrag($event, item)">
              {{ item.mapel?.mapel }}
              <h3 class="font-medium text-xs ">{{ item.nama }}</h3>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ref, onMounted } from "vue";
import useKelas from "../../services/data/kelas";
import { useRoute } from "vue-router";
import useUser from "../../services/data/user";


const { show, kelas } = useKelas();
const { user, index } = useUser();

const router = useRoute();

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

onMounted(() => {
  show(router.params.id);
  index();
});

function getList(row, col) {
  return user.value.filter((item) => item.list === row * 10 + col);
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
  const item = user.value.find((item) => item.id == itemId);
  item.list = row * 10 + col;
}

const tableToExport = ref(null);
async function exportPDF() {
  const table = tableToExport.value;

  // Use html2canvas to capture the table as an image
  const canvas = await html2canvas(table);

  // Initialize jsPDF with landscape orientation
  const pdf = new jsPDF("l", "mm", "a4");

  // Add the captured image to the PDF
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 297, 210);

  // Save or open the PDF
  pdf.save(`jadwal.pdf`);
}

</script>
