import {
  fetchUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser
} from '@/api/service'

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
  },
  getUserById({ commit }, id) {
    return getUserById(id).then((resp) => {
      commit('UPDATE_USER', resp)
      return resp
    })
  },
  createUser({ commit }, data) {
    return createUser(data).then((resp) => {
      commit('ADD_USER', resp)
      return resp
    })
  },
  updateUser({ commit }, { id, data }) {
    return updateUser(id, data).then((resp) => {
      commit('UPDATE_USER', resp)
      return resp
    })
  },

  deleteUser({ commit }, id) {
    return deleteUser(id).then((resp) => {
      commit('DELETE_USER', resp)
      return resp
    })
  }
}
const mutations = {
  SET_USERS(state, { data }) {
    state.users = data
  },
  DELETE_USER(state, { data }) {
    state.users = state.users.filter((item) => item.id !== data.id)
  },
  UPDATE_USER(state, { data }) {
    // state.users = state.users.filter((item) => item.id !== data.id)
  },
  ADD_USER(state, { data }) {
    // state.users = state.users.filter((item) => item.id !== data.id)
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
