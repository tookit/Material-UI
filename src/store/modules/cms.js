import {
  fetchNews,
  createNews,
  updateNews,
  getNewsById,
  fetchNewsCategory,
  createNewsCategory,
  updateNewsCategory,
  getNewsCategoryById,
  fetchSlider,
  getSilderById,
  deleteSilderById,
  createSlider,
  updateSlider
} from '@/api/service'
const state = {
  categories: []
}
const getters = {
  getCmsCategories: (state) => {
    return state.categories
  }
}
const actions = {
  fetchNews({ commit }, query) {
    return fetchNews(query).then((resp) => {
      return resp
    })
  },
  createNews({ commit }, query) {
    return createNews(query).then((resp) => {
      return resp
    })
  },
  updateNews({ commit }, { id, data }) {
    return updateNews(id, data).then((resp) => {
      return resp
    })
  },
  getNewsById({ commit }, id) {
    return getNewsById(id).then((resp) => {
      return resp
    })
  },

  fetchNewsCategory({ commit }, query) {
    return fetchNewsCategory(query).then((resp) => {
      return resp
    })
  },
  createNewsCategory({ commit }, query) {
    return createNewsCategory(query).then((resp) => {
      return resp
    })
  },
  updateNewsCategory({ commit }, { id, data }) {
    return updateNewsCategory(id, data).then((resp) => {
      return resp
    })
  },
  getNewsCaegoryById({ commit }, id) {
    return getNewsCategoryById(id).then((resp) => {
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
