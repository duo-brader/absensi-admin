import { ref } from "vue";
import axios from "../../axios";
import { useRouter } from "vue-router";
import useSwal from "../../swal";
export default function useKategori() {
  const kategori = ref([]);
  const errors = ref({});
  const wisata = ref([]);
  const router = useRouter();
  const { accepted, rejected, confirm } = useSwal();

  async function index(page = 1) {
    const response = await axios.get(
      `/api/panel/merchant-kategori?page=${page}`
    );
    kategori.value = response.data;
    console.log(response.data);
  }

  async function detailKategori(params) {
    const response = await axios.get(`/api/kategori/?nama=${params}`);
    wisata.value = response.data.data;
  }

  async function storeMerchantKategori(payload) {
    try {
      await axios.post(`/api/panel/merchant-kategori`, payload);
      accepted("Data Telah Disimpan");
      router.back();
    } catch (error) {
      errors.value = error;
    }
  }

  async function single(id) {
    const response = await axios.get(`/api/panel/kategori/${id}`);
    console.log(response.data);
    kategori.value = response.data.data;
  }

  async function status(id) {
    const response = confirm("Apa anda ingin mengubah status kategori ini?");

    if ((await response).isConfirmed) {
      try {
        const response = await axios.post(`/api/kategori/status/${id}`);
        console.log(response.data);
        accepted(response.data.message);
        setTimeout(() => {
          router.back();
        }, 1500);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          rejected(error.response.data.message);
        }
      }
    }
  }

  async function update(id, payload) {
    try {
      const response = await axios.post(`/api/kategori/${id}`, payload);
      console.log(response.data);
      accepted(response.data.message);
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        rejected(error.response.data.message);
      }
    }
  }

    async function destroyKategori(id) {
      const response = await confirm("Apa anda ingin menghapus data ini?");
      if (response.isConfirmed) {
        try {
          const response = await axios.delete(
            `/api/panel/destroyKategori/${id}`
          );
          accepted("Data Telah Dihapus");
          setTimeout(() => {
            index();
          }, 1000);
          router.push({ path: `/pengaturan/merchant-kategori` });
          console.log(response);
        } catch (error) {
          console.error(error);
          rejected("Terjadi kesalahan saat menghapus data.");
        }
      }
    }

  return {
    kategori,
    storeMerchantKategori,
    index,
    detailKategori,
    wisata,
    single,
    status,
    update,
    destroyKategori,
  };
}
