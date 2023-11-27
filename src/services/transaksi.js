import axios from '@/services/axios'
import useExecute from "@/services/execute";
import router from '@/router'
import { ref } from 'vue'

export default function useTransaksi() {
  const transaksi = ref([])
  const errors = ref({})
  const { confirm, accepted, rejected } = useExecute()

  async function indexTransaksi() {
    const response = await axios.get(`/api/panel/transaksi`)
    transaksi.value = response.data
  }

  async function optionTransaksi() {
    const response = await axios.get(`/api/panel/transaksi/option`)
    transaksi.value = response.data
  }

  async function addTransaksi(id) {
    try {
      await axios.put(`/api/add-transaksi/${id}`)
      router.back()
      await accepted('Data Telah Disimpan')
    } catch (error) {
      errors.value = error
    }
  }

  // async function updateTransaksi(id, payload) {
  //   try {
  //     await axios.post(`/api/panel/transaksi/${id}`, payload)
  //     router.back()
  //     await accepted('Data Telah Disimpan')
  //   } catch (error) {
  //     errors.value = error
  //   }
  // }

  // async function storeTransaksi(payload) {
  //   try {
  //     await axios.post(`/api/panel/transaksi`, payload)
  //     router.back()
  //     accepted('Data Telah Disimpan')
  //   } catch (error) {
  //     errors.value = error
  //   }
  // }

  async function showTransaksi(id) {
    const response = await axios.get(`/api/panel/transaksi/${id}`)
    transaksi.value = response.data
  }

  async function destroyTransaksi(id) {
    const response = await confirm('Apa anda ingin menghapus data ini?')
    if(response.isConfirmed){
      accepted('Data Telah Dihapus')
      await axios.delete(`/api/panel/transaksi/${id}`)
      router.back()
    }
  }

  return {
    transaksi,
    indexTransaksi,
    optionTransaksi,
    addTransaksi,
    // storeTransaksi,
    // updateTransaksi,
    destroyTransaksi,
    showTransaksi,
  }
}
