import {
  fetchProducts,
  fetchQuote,
  fetchProductCategories,
  fetchCategoryTree,
  getProductCategoryById,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductCategory,
  fetchImagesByProductId
} from '@/api/service'
const state = {
  categories: [],
  flags: [
    {
      text: 'Default',
      value: 1
    },
    {
      text: 'Promoted',
      value: 2
    },
    {
      text: 'Hot',
      value: 3
    },
    {
      text: 'New',
      value: 4
    },
    {
      text: 'Featured',
      value: 5
    }
  ]
}
const getters = {
  getProductCategories: (state) => {
    return state.categories
  },
  getProductFlags: (state) => {
    return state.flags
  },
  getFlagLabel: (state) => (value) => {
    const find = state.flags.find((item) => item.value === value)
    return find ? find.text : ''
  }
}
const actions = {
  fetchProducts({ commit }, query) {
    return fetchProducts(query).then((resp) => {
      return resp
    })
  },

  fetchQuote({ commit }, query) {
    return fetchQuote(query).then((resp) => {
      return resp
    })
  },
  fetchProductCategories({ commit }, query) {
    return fetchProductCategories(query).then((resp) => {
      return resp
    })
  },

  fetchProductCategoryTree({ commit }) {
    return fetchCategoryTree().then((resp) => {
      commit('SET_PRODUCT_CATEGORY', resp)
      return resp
    })
  },

  fetchImageByProductId({ commit }, id) {
    return fetchImagesByProductId(id).then((resp) => {
      return resp
    })
  },
  getProductById({ commit }, id) {
    return getProductById(id).then((resp) => {
      return resp
    })
  },

  getProductCategoryById({ commit }, id) {
    return getProductCategoryById(id).then((resp) => {
      return resp
    })
  },
  updateProduct({ commit }, { id, data }) {
    return updateProduct(id, data).then((resp) => {
      return resp
    })
  },
  deleteProduct({ commit }, id) {
    return deleteProduct(id).then((resp) => {
      return resp
    })
  },
  updateProductCategory({ commit }, { id, data }) {
    return updateProductCategory(id, data).then((resp) => {
      return resp
    })
  }
}
const mutations = {
  SET_PRODUCT_CATEGORY(state, { data }) {
    state.categories = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
