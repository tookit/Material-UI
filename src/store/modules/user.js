import { fetchUsers } from '@/api/service'

const state = {
  users: []
}
const getters = {}
const actions = {
  fetchUsers({ commit }, query) {
    return fetchUsers(query).then((resp) => {
      commit('SET_USERS', resp)
      return resp
    })
  }
}
const mutations = {
  SET_USERS(state, { data }) {
    state.users = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
