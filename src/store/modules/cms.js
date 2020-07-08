import {
  fetchNews,
  fetchSlider,
  getSilderById,
  deleteSilderById,
  createSlider,
  updateSlider
} from '@/api/service'
const state = {}
const getters = {}
const actions = {
  fetchNews({ commit }, query) {
    return fetchNews(query).then((resp) => {
      return resp
    })
  },

  createSlider({ commit }, query) {
    return createSlider(query).then((resp) => {
      return resp
    })
  },
  updateSlider({ commit }, { id, data }) {
    return updateSlider(id, data).then((resp) => {
      return resp
    })
  },

  getSliderById({ commit }, id) {
    return getSilderById(id).then((resp) => {
      return resp
    })
  },
  deleteSliderById({ commit }, id) {
    return deleteSilderById(id).then((resp) => {
      return resp
    })
  },
  fetchSlider({ commit }, query) {
    return fetchSlider(query).then((resp) => {
      return resp
    })
  }
}
const mutations = {}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
