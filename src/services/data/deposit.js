import axios from '@/services/axios'
import useExecute from "@/services/execute";
import router from '@/router'
import { ref } from 'vue'

export default function useDeposit() {
  const deposit = ref([])
  const errors = ref({})
  const { confirm, accepted, rejected } = useExecute()

  async function indexDeposit() {
    const response = await axios.get(`/api/panel/deposit`)
    deposit.value = response.data
  }

  async function optionDeposit() {
    const response = await axios.get(`/api/panel/deposit/option`)
    deposit.value = response.data
  }

  async function addDeposit(id) {
    try {
      // router.back()
      await axios.put(`/api/add-deposit/${id}`)
      await accepted('Data Telah Disimpan')
    } catch (error) {
      errors.value = error
    }
  }

  // async function updateDeposit(id, payload) {
  //   try {
  //     await axios.post(`/api/panel/deposit/${id}`, payload)
  //     router.back()
  //     await accepted('Data Telah Disimpan')
  //   } catch (error) {
  //     errors.value = error
  //   }
  // }

  // async function storeDeposit(payload) {
  //   try {
  //     await axios.post(`/api/panel/deposit`, payload)
  //     router.back()
  //     accepted('Data Telah Disimpan')
  //   } catch (error) {
  //     errors.value = error
  //   }
  // }

  async function showDeposit(id) {
    const response = await axios.get(`/api/panel/deposit/${id}`)
    deposit.value = response.data
  }

  async function destroyDeposit(id) {
    const response = await confirm('Apa anda ingin menghapus data ini?')
    if(response.isConfirmed){
      accepted('Data Telah Dihapus')
      await axios.delete(`/api/panel/deposit/${id}`)
      router.back()
    }
  }

  return {
    deposit,
    indexDeposit,
    optionDeposit,
    addDeposit,
    // storeDeposit,
    // updateDeposit,
    destroyDeposit,
    showDeposit,
  }
}
