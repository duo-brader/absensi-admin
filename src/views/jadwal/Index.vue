<template>
  <div class="flex justify-center flex-col gap-12 items-center">
    <div class="my-12">
      <h3 class="uppercase font-bold text-xl">
        Jadwal Kelas {{ kelas.kelas }}
      </h3>
      <button @click="exportPDF" class="mt-5 bg-red-500 text-white px-12 py-4">
        Export PDF
      </button>
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
    <table ref="tableToExport" class="table-auto border border-black w-80">
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
          <!-- {{ rowIndex * 10 + colIndex + 1 }} -->
          <div
            v-for="(item, itemIndex) in getList(rowIndex, colIndex)"
            :key="itemIndex"
            class="w-full h-full flex justify-center flex-col items-center absolute bg-blue-300 top-0 left-0"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            {{ item.nama }}
            <h3 class="font-bold text-xl">{{ item.mapel?.mapel }}</h3>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
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

  // Initialize jsPDF
  const pdf = new jsPDF("p", "mm", "a4");

  // Add the captured image to the PDF
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);

  // Save or open the PDF
  pdf.save("table-export.pdf");
}
</script>
