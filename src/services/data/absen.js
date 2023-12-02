import axios from "../axios";
import { ref } from "vue";
import useSwal from "../swal";

export default function useAbsen() {
    const absen = ref([]);
    const { confirmAction, accepted, failed } = useSwal();

    async function store(payload, id) {
        const isConfirmed = await confirmAction("Mengajar dikelas ini?");

        if (isConfirmed) {
            try {
                const response = await axios.post(`/api/v1/absen/${id}`, payload);
                console.log(response.data);
                accepted("Absen berhasil disimpan");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data);
                    failed(error.response?.data);
                }
            }
        }
    }

    async function index() {
        try {
            const response = await axios.get("/api/v1/admin/absen");
            console.log(response.data);
            absen.value = response.data;
        } catch (error) {
            console.error("Failed to fetch absen data", error);
        }
    }

    return {
        store,
        index,
        absen,
    };
}
