import axios from "../../axios";
import { ref } from "vue";
import useSwal from "../../swal";
import { useRouter } from "vue-router";

export default function useMerchant() {
  const merchant = ref([]);
  const { accepted, rejected, confirm } = useSwal();
  const router = useRouter();

  async function index() {
    const response = await axios.get("/api/merchant");
    console.log(response.data);
    merchant.value = response.data;
  }

  async function showMerchant(id) {
    const response = await axios.get(`/api/panel/merchant/${id}`);
    console.log(response.data);
    merchant.value = response.data.data;
  }

  async function update(id, payload) {
    try {
      const response = await axios.post(`/api/panel/merchant/${id}`, payload);
      console.log(response.data);
      router.back();
      accepted(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        rejected(error.response.data.message);
        console.log(error.response.data);
      }
    }
  }

    async function destroyMerchant(id) {
      const response = await confirm("Apa anda ingin menghapus data ini?");
      if (response.isConfirmed) {
        try {
          const response = await axios.delete(
            `/api/panel/destroyMerchant/${id}`
          );
          accepted("Data Telah Dihapus");
          setTimeout(() => {
            index();
          }, 1000);
          router.push({ path: `/verifikasi` });
          console.log(response);
        } catch (error) {
          console.error(error);
          rejected("Terjadi kesalahan saat menghapus data.");
        }
      }
    }

  return {
    merchant,
    index,
    update,
    showMerchant,
    destroyMerchant,
  };
}
