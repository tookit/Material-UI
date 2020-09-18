import request from '@/utils/request'
const state = {
  properties: []
}
const getters = {
  getPoperties: (state) => state.properties
}
const actions = {
  fetchProperty({ commit }, query) {
    return request({
      url: '/mall/property',
      method: 'get',
      params: query
    }).then((resp) => {
      if (query && query.pageSize == -1) {
        commit('SET_PRODUCT_PROPERTIES', resp.data)
      }
      return resp
    })
  },

  createProperty({ commit }, data) {
    return request({
      url: '/mall/property',
      method: 'post',
      data: data
    }).then((resp) => {
      commit('ADD_PROPERTY', resp.data)
    })
  },
  updateProperty({ commit }, { id, data }) {
    return request({
      url: `/mall/property/${id}`,
      method: 'put',
      data: data
    }).then((resp) => {
      commit('UPDATE_PROPERTY', resp.data)
    })
  },
  deleteProperty({ commit }, id) {
    return request({
      url: `/mall/property/${id}`,
      method: 'delete'
    }).then(() => {
      commit('DELETE_PROPERTY', id)
    })
  },
  detachPropertyForCategory({ commit }, { cid, data }) {
    return request({
      url: `/mall/category/${cid}/property`,
      method: 'delete',
      data: data
    })
  }
}
const mutations = {
  SET_PRODUCT_PROPERTIES(state, data) {
    state.properties = data
  },
  ADD_PROPERTY(state, data) {
    state.properties.push(data)
  },
  UPDATE_PROPERTY(state, data) {
    state.properties.forEach((item) => {
      if (item.id === data.id) {
        item = data
      }
    })
  },
  DELETE_PROPERTY(state, id) {
    state.properties = state.properties.filter((item) => item.id !== id)
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
