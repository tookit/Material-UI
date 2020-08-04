import {
  fetchRoles,
  getRoleById,
  deleteRole,
  createRole,
  updateRole
} from '@/api/service'

const state = {
  roles: []
}
const getters = {}
const actions = {
  fetchRoles({ commit }, query) {
    return fetchRoles(query).then((resp) => {
      commit('SET_ROLES', resp)
      return resp
    })
  },
  getRoleById({ commit }, id) {
    return getRoleById(id).then((resp) => {
      commit('UPDATE_ROLE', resp)
      return resp
    })
  },
  createRole({ commit }, data) {
    return createRole(data).then((resp) => {
      commit('ADD_ROLE', resp)
      return resp
    })
  },
  updateRole({ commit }, { id, data }) {
    return updateRole(id, data).then((resp) => {
      commit('UPDATE_ROLE', resp)
      return resp
    })
  },

  deleteRole({ commit }, id) {
    return deleteRole(id).then((resp) => {
      commit('DELETE_ROLE', resp)
      return resp
    })
  }
}
const mutations = {
  SET_ROLES(state, { data }) {
    state.roles = data
  },
  DELETE_ROLE(state, { data }) {
    state.roles = state.roles.filter((item) => item.id !== data.id)
  },
  UPDATE_ROLE(state, { data }) {
    // state.users = state.users.filter((item) => item.id !== data.id)
  },
  ADD_ROLE(state, { data }) {
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
