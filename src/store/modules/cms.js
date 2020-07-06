import { fetchNews, fetchSlider } from '@/api/service'
const state = {}
const getters = {}
const actions = {
  fetchNews({ commit }, query) {
    return fetchNews(query).then((resp) => {
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
