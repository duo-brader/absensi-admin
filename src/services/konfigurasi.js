import axios from '@/services/axios'
import useExecute from "@/services/execute";
import router from '@/router'
import { ref } from 'vue'

export default function useKonfigurasi() {
  const konfigurasi = ref([])
  const errors = ref({})
  const { confirm, accepted, rejected } = useExecute()

  async function indexKonfigurasi() {
    const response = await axios.get(`/api/panel/konfigurasi`)
    konfigurasi.value = response.data
  }

  async function optionKonfigurasi() {
    const response = await axios.get(`/api/panel/konfigurasi/option`)
    konfigurasi.value = response.data
  }

  async function updateKonfigurasi(id, payload) {
    try {
      await axios.put(`/api/panel/konfigurasi/${id}`, payload)
      router.back()
      await accepted('Data Telah Disimpan')
    } catch (error) {
      errors.value = error
    }
  }

  async function storeKonfigurasi(payload) {
    try {
      await axios.post(`/api/panel/konfigurasi`, payload)
      router.back()
      accepted('Data Telah Disimpan')
    } catch (error) {
      errors.value = error
    }
  }

  async function showKonfigurasi(id) {
    const response = await axios.get(`/api/panel/konfigurasi/${id}`)
    konfigurasi.value = response.data
  }

  async function destroyKonfigurasi(id) {
    const response = await confirm('Apa anda ingin menghapus data ini?')
    if(response.isConfirmed){
      accepted('Data Telah Dihapus')
      await axios.delete(`/api/panel/konfigurasi/${id}`)
      router.back()
    }
  }

  return {
    konfigurasi,
    indexKonfigurasi,
    optionKonfigurasi,
    storeKonfigurasi,
    updateKonfigurasi,
    destroyKonfigurasi,
    showKonfigurasi,
  }
}
