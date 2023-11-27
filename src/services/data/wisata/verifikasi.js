import axios from "../../axios";
import { ref } from "vue";
import useSwal from "../../swal";

export default function useVerifikasi() {
  const merchant = ref([]);
  const { accepted, rejected } = useSwal();

  async function index() {
    const response = await axios.get("/api/panel/merchant");
    console.log(response.data.data);
    merchant.value = response.data.data;
  }

  async function update(id, payload) {
    try {
      const response = await axios.post(`/api/panel/merchant/${id}`, payload);
      console.log(response.data);
      accepted(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response.data);
        rejected(error.response.data.message);
      }
    }
  }

  return {
    merchant,
    index,
    update,
  };
}
