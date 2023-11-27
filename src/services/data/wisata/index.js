import { useRouter } from "vue-router";
import axios from "../../axios";
import useExecute from "../../execute";
import { ref } from "vue";

export default function useWisata() {
  const news = ref([]);
  const wisata = ref([]);
  const router = useRouter();
  const slide = ref([]);
  const { accepted, rejected, confirm } = useExecute();

  async function indexWisata() {
    const response = await axios.get("/api/panel/wisata");
    console.log(response.data);
    wisata.value = response.data;
  }

  async function indexWisatas(page = 1) {
    const response = await axios.get(`/api/panel/wisatas?page=${page}`);
    wisata.value = response.data;
    console.log(response.data);
  }

  async function getNews() {
    try {
      const response = await axios.get("/api/panel/news");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function makeNews(params) {
    const response = await axios.post(`/api/panel/news/${params}`);
    setTimeout(() => {
      indexWisata();
    }, 1500);
    console.log(response.data);
    // router.back();
  }

  async function indexSlide() {
    const response = await axios.get("/api/panel/slide");
    console.log(response.data);
    slide.value = response.data.data;
  }

  async function makeSlide(params) {
    try {
      const response = await axios.post("/api/panel/slide", params);
      console.log(response.data);
      accepted(response.data.message);
      router.back();
    } catch (error) {
      console.log(error);
      console.log(response.data);
      rejected(response.data.message);
    }
  }

  async function activeSlide(params) {
    try {
      const response = await axios.post(`/api/panel/slide/${params}`);
      console.log(response.data);
      accepted(response.data.message);
      setTimeout(() => {
        indexSlide();
      }, 1000);
    } catch (error) {
      if (error.response.status == 401) {
        rejected(error.response.data.message);
        setTimeout(() => {
          router.go();
        }, 1000);
      }
    }
  }

  async function destroySlide(id) {
    const response = await confirm("Apa anda ingin menghapus data ini?");
    if (response.isConfirmed) {
      try {
        const response = await axios.delete(`/api/panel/destroySlide/${id}`);
        accepted("Data Telah Dihapus");
        setTimeout(() => {
          indexSlide();
        }, 1000);
        // router.push({ path: `/pengaturan/wisata` });
        console.log(response);
      } catch (error) {
        console.error(error);
        rejected("Terjadi kesalahan saat menghapus data.");
      }
    }
  }

  async function showWisata(id) {
    const response = await axios.get(`/api/panel/wisata/${id}`);
    wisata.value = response.data;
  }

  async function destroyWisata(id) {
    const response = await confirm("Apa anda ingin menghapus data ini?");
    if (response.isConfirmed) {
      try {
        await axios.delete(`/api/panel/wisata/images/${id}`);

        const response = await axios.delete(`/api/panel/wisata/${id}`);
        accepted("Data Telah Dihapus");
        setTimeout(() => {
          indexWisata();
        }, 1000);
        // router.push({ path: `/pengaturan/wisata` });
        console.log(response);
      } catch (error) {
        console.error(error);
        rejected("Terjadi kesalahan saat menghapus data.");
      }
    }
  }

  async function activeWisata(params) {
    try {
      const response = await axios.post(`/api/panel/wisata/${params}`);
      console.log(response.data);
      accepted(response.data.message);
      setTimeout(() => {
        indexWisata();
      }, 1000);
    } catch (error) {
      if (error.response.status == 401) {
        rejected(error.response.data.message);
        setTimeout(() => {
          router.go();
        }, 1000);
      }
    }
  }

  return {
    showWisata,
    destroyWisata,
    activeWisata,
    news,
    getNews,
    indexWisata,
    wisata,
    makeNews,
    indexSlide,
    slide,
    makeSlide,
    activeSlide,
    destroySlide,
    indexWisatas,
  };
}
