import { ref } from "vue";
import axios from "../axios";
import useSwal from "../swal";
import router from "../../router";

export default function useUser() {
  const user = ref([]);
  const { accepted, rejected, confirm } = useSwal();

  async function index() {
    const response = await axios.get("/api/v1/user");
    console.log(response.data);
    user.value = response.data;
  }

  // async function store(payload) {
  //   try {
  //     const response = await axios.post("/api/v1/mapel", payload);
  //     console.log(response.data);
  //     accepted(response.data.message);
  //     router.back();
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log(error.response?.data);
  //       rejected(error.response?.data);
  //     }
  //   }
  // }

  async function update(payload, id) {
    const response = await confirm("yakin ubah data ini?");

    if (response.isConfirmed) {
      try {
        const response = await axios.put(`/api/v1/admin/user/${id}`, payload);
        console.log(response.data);
        accepted(response.data);
        router.back();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          rejected(error.response?.data);
        }
      }
    }
  }

  async function show(id) {
    const response = await axios.get(`/api/v1/admin/user/${id}`);
    console.log(response.data);
    user.value = response.data;
  }

  async function destroy(id) {
    const response = await confirm("Hapus data ini?");

    if (response.isConfirmed) {
      try {
        const response = await axios.delete(`/api/v1/admin/user/${id}`);
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
    index,
    user,
    show,
    update,
    destroy,
    // update,
    // show,
    // store,
    // destroy,
  };
}
