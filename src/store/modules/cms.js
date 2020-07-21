import {
  fetchTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
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
  categories: [],
  tags: []
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
  fetchTags({ commit }, query) {
    return fetchTags(query).then((resp) => {
      commit('SET_TAGS', resp.data)
      return resp
    })
  },
  createNews({ commit }, query) {
    return createNews(query).then((resp) => {
      return resp
    })
  },
  createTag({ commit }, query) {
    return createTag(query).then((resp) => {
      return resp
    })
  },
  updateNews({ commit }, { id, data }) {
    return updateNews(id, data).then((resp) => {
      return resp
    })
  },
  updateTag({ commit }, { id, data }) {
    return updateTag(id, data).then((resp) => {
      return resp
    })
  },
  getNewsById({ commit }, id) {
    return getNewsById(id).then((resp) => {
      return resp
    })
  },
  getTagById({ commit }, id) {
    return getTagById(id).then((resp) => {
      return resp
    })
  },

  fetchNewsCategory({ commit }, query) {
    return fetchNewsCategory(query).then((resp) => {
      commit('SET_NEWS_CATEGORIES', resp)
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
  getNewsCategoryById({ commit }, id) {
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
const mutations = {
  SET_NEWS_CATEGORIES(state, { data }) {
    state.categories = data
  },
  SET_TAGS(state, data) {
    state.tags = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
