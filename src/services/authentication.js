import axios from "./axios";
import useExecute from "./execute";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isAxiosError } from "axios";

export default function useAuthentication() {
  const auth = ref("");
  const router = useRouter();
  const errors = ref("");
  const { confirm, accepted, rejected } = useExecute();
  const user = ref([]);

  async function doLogin(payload) {
    try {
      await axios.get(`/sanctum/csrf-cookie`);
      const response = await axios.post("/api/v1/auth/login", payload);
      const token = await response.data.data.token;
      if (response.data.data.user.roles_id == 1) {
        accepted("Selamat Datang");
        setHeaderToken(token);
        router.push("/dashboard");
      } else {
        rejected("Anda Tidak Boleh Mengakses Halaman Ini!!!!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          (errors.value = error.response.data.message), rejected(errors.value);
        }
        if (error.response.status === 422)
          errors.value = error.response.data.errors;
        if (error.response.status === 500)
          rejected("Server In Trouble call your administrator");
      }
    }
  }

  async function doRegister(payload) {
    const response = await axios.post("/v1/auth/register", payload);
    let token = await response.data.access_token;
    setHeaderToken(token);
    router.push("/dashboard");
  }

  async function getAuth() {
    try {
      const response = await axios.get("/api/v1/profile");
      auth.value = await response.data;
    } catch (error) {
      removeHeaderToken();
      if (error.response.status === 401) router.push("/login");
      // console.log(error.response);
    }
  }

  async function doLogout() {
    const response = await confirm("Apa anda ingin keluar?");
    if (response.isConfirmed) {
      try {
        await axios.post("/api/v1/auth/logout");
        removeHeaderToken();
        router.push("/login");
        await accepted("Anda telah keluar");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function doUpdate(payload) {
    try {
      await axios.post("api/profile/update", payload);
      window.location.reload();
      isLoading.value = false;
    } catch (error) {
      console.log(error);
    }
  }

  function setHeaderToken(token) {
    localStorage.setItem("access_token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  function removeHeaderToken() {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("access_token");
  }

  async function indexUser() {
    const response = await axios.get("api/user/index");
    user.value = response.data;
  }

  return {
    auth,
    errors,
    doLogin,
    doLogout,
    doRegister,
    doUpdate,
    getAuth,
    indexUser,
    user,
  };
}
