import axios from '@/services/axios'
import useExecute from "@/services/execute";
import router from '@/router'
import { ref } from 'vue'

export default function useSlide() {
  const slide = ref([])
  const errors = ref({})
  const { confirm, accepted, rejected } = useExecute()

  async function indexSlide() {
    const response = await axios.get(`/api/panel/slide`)
    slide.value = response.data
  }

  async function optionSlide() {
    const response = await axios.get(`/api/panel/slide/option`)
    slide.value = response.data
  }

  async function updateSlide(id, payload) {
    try {
      await axios.post(`/api/panel/slide/${id}`, payload)
      router.back()
      await accepted('Data Telah Disimpan')
    } catch (error) {
      errors.value = error
    }
  }

  async function storeSlide(payload) {
    try {
      await axios.post(`/api/panel/slide`, payload)
      router.back()
      accepted('Data Telah Disimpan')
    } catch (error) {
      errors.value = error
    }
  }

  async function showSlide(id) {
    const response = await axios.get(`/api/panel/slide/${id}`)
    slide.value = response.data
  }

  async function destroySlide(id) {
    const response = await confirm('Apa anda ingin menghapus data ini?')
    if(response.isConfirmed){
      accepted('Data Telah Dihapus')
      await axios.delete(`/api/panel/slide/${id}`)
      router.back()
    }
  }

  return {
    slide,
    indexSlide,
    optionSlide,
    storeSlide,
    updateSlide,
    destroySlide,
    showSlide,
  }
}
