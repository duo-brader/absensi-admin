import { ref } from "vue";
import axios from "../axios";

export default function useJurusan() {
  const jurusan = ref([]);

  async function index() {
    const response = await axios.get("/api/v1/admin/jurusan");
    console.log(response.data);
    jurusan.value = response.data;
  }

  return {
    jurusan,
    index,
  };
}
