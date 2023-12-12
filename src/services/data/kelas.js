import axios from "../axios";
import { ref } from "vue";
import useSwal from "../swal";
import router from "../../router";

export default function useKelas() {
  const kelas = ref([]);
  const { accepted, confirm, rejected } = useSwal();

  async function indexKelas() {
    const response = await axios.get("/api/v1/kelas");
    console.log(response.data.kelas);
    kelas.value = response.data.kelas;
  }

  async function store(payload) {
    try {
      const response = await axios.post("/api/v1/kelas", payload);
      console.log(response.data);
      accepted(response.data.message);
      router.back();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        rejected(error.response?.data);
      }
    }
  }

  async function show(id) {
    const response = await axios.get(`/api/v1/kelas/${id}`);
    kelas.value = response.data.kelas;
  }

  async function update(payload, id) {
    const response = await confirm("Update data?");

    if (response.isConfirmed) {
      try {
        const response = await axios.put(`/api/v1/kelas/${id}`, payload);
        console.log(payload);
        console.log(response.data);
        accepted(response.data.message);
        router.back();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          rejected(error.response?.data);
        }
      }
    }
  }

  async function destroy(id) {
    const response = await confirm("Hapus data ini?");

    if (response.isConfirmed) {
      try {
        const response = await axios.delete(`/api/v1/kelas/${id}`);
        console.log(response.data);
        accepted(response.data.message);
        router.back();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          rejected(error.response?.data);
        }
      }
    }
  }

  return {
    indexKelas,
    store,
    show,
    update,
    destroy,
    kelas,
  };
}
