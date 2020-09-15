import request from '@/utils/request'
const state = {
  vendors: []
}
const getters = {}
const actions = {
  fetchVendors({ commit }, query) {
    return request({
      url: `/mall/vendor`,
      method: 'get'
    })
  },
  getVendorById({ commit }, id) {
    return request({
      url: `/mall/vendor/${id}`,
      method: 'get'
    })
  },
  createVendor({ commit }, data) {
    return request({
      url: `/mall/vendor`,
      method: 'post',
      data: data
    })
  },
  updateVendor({ commit }, { id, data }) {
    return request({
      url: `/mall/vendor/${id}`,
      method: 'put',
      data: data
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
