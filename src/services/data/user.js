import axios from "../axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useSwal from "../swal";

export default function useAuth() {
  const auth = ref("");
  const router = useRouter();
  const errors = ref("");
  const btn = ref(false);
  const { confirm, accepted, rejected } = useSwal();

  async function login(payload) {
    try {
      btn.value = true;
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/api/login", payload);
      const token = await response.data.content.access_token;
      accepted(response.data.message);
      router.push("/beranda");
      setHeaderToken(token);
    } catch (error) {
      if (error.response.data.status === 401) {
        btn.value = false;
        errors.value = error.response.data.message;
        rejected(errors.value);
      }
      if (error.response.status === 422)
        errors.value = error.response.data.errors;
      if (error.response.status === 500)
        errors.value = error.response.data.errors;
    }
  }

  async function register(payload) {
    try {
      btn.value = true;
      await axios.get(`/sanctum/csrf-cookie`);
      const response = await axios.post("/api/register", payload);
      console.log(response.data);
      router.push({
        name: "otp",
        params: { phone: response.data.data.phone },
      });
      accepted("Pendaftaran Anda Berhasil, Silakan Masukkan Kode OTP");
    } catch (error) {
      if (error.response.status === 401) {
        btn.value = false;
        errors.value = error.response.data.message;
        rejected(errors.value);
      }
      if (error.response.status === 422)
        errors.value = error.response.data.errors;
      if (error.response.status === 500)
        errors.value = error.response.data.errors;
    }
  }

  async function getAuth() {
    try {
      const response = await axios.get("/api/user");
      auth.value = response.data;
      // console.log(response.data);

      // if (response.data.is_verified === 0) {
      //   router.push("/otp/" + response.data.phone);
      //   // console.log('here')
      // }
    } catch (error) {
      removeHeaderToken();
      if (error.response.status === 401) router.push("/login");
      // console.log(error.response);
    }
  }

  async function logout() {
    const response = await confirm("Apa anda ingin keluar?");
    if (response.isConfirmed) {
      try {
        await axios.get("/api/logout");
        removeHeaderToken();
        router.push("/login");
        await accepted("Anda telah keluar");
      } catch (error) {
        console.log(error);
      }
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

  async function verifyOtp(payload) {
    try {
      const response = await axios.post("/api/verify", payload);
      console.log(response.data);
      if (response.data.is_verified == 2) {
        router.push({
          name: "new.password",
          params: { phone: response.data.phone },
        });
        accepted("Akun berhasil ditemukan, Silahkan update password");
      } else {
        router.push("/login");
        accepted("Pendaftaran Anda Berhasil, Silakan Melakukan Login");
      }
    } catch (error) {
      if (error.response.status === 401) {
        (errors.value = error.response.data.message), rejected(errors.value);
      }
      if (error.response.status === 422) rejected(error.response.data.message);
      if (error.response.status === 500) rejected(error.response.data);
    }
  }

  async function verifyNumber(payload) {
    try {
      const response = await axios.post("/api/verify-number", payload);
      console.log(response.data);
      router.push({
        name: "otp",
        params: { phone: response.data },
      });
    } catch (error) {
      if (error.response.status === 401) {
        (errors.value = error.response.data.message),
          rejected(error.response.data);
      }
      if (error.response.status === 422) rejected(error.response.data.message);
      if (error.response.status === 500) rejected(error.response.data);
    }
  }

  async function updatePassword(payload) {
    try {
      const response = await axios.post("/api/update-password", payload);
      console.log(response.data);
      router.push("/login");
      accepted("Password berhasil dirubah, Silahkan login");
    } catch (error) {
      if (error.response.status === 401) {
        (errors.value = error.response.data.message),
          rejected(error.response.data);
      }
    }
  }

  return {
    login,
    register,
    errors,
    getAuth,
    auth,
    btn,
    logout,
    verifyOtp,
    verifyNumber,
    updatePassword,
  };
}
