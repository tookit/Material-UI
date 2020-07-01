import { getProject, getProjectList } from '@/api/service'
import cloneDeep from 'lodash/cloneDeep'

const state = {
  projects: [],
  currentProject: null
}
const getters = {
  getCurrentProject: (state) => {
    return state.currentProject
  },
  getCurrentProjectLabel: (state) => {
    return state.currentProject ? state.currentProject._source.label : ''
  },
  getProjects: (state) => {
    return state.projects
  },
  getLast7DayBucketsByProjectId: (state) => (projectId) => {
    const project = state.projects.find((item) => item._id === projectId)
    const aggregations = project.aggregations
    return aggregations.last7d.match_per_day.buckets
  },

  getLast7DayBucketsByRuleId: (state) => (projectId, ruleId) => {
    const project = state.projects.find((item) => item._id === projectId)
    const aggregations = project.aggregations
      ? project.aggregations[ruleId]
      : null
    return aggregations ? aggregations.last7d.match_per_day.buckets : []
  },
  getLast7DayCountByRuleId: (state) => (projectId, ruleId) => {
    const project = state.projects.find((item) => item._id === projectId)
    const aggregations = project.aggregations
      ? project.aggregations[ruleId]
      : null
    console.log(aggregations)
    return aggregations ? aggregations.last7d.doc_count : 0
  }
}
const actions = {
  fetchProject({ commit }) {
    return getProjectList().then((resp) => {
      commit('SET_PROJECTS', resp)
      return resp
    })
  },
  updateProject({ commit }, projectId) {
    commit('UPDATE_PROJECTS', projectId)
  },
  addProject({ commit }, projectId) {
    commit('ADD_PROJECT', projectId)
  },
  deleteProject({ commit }, projectId) {
    commit('DELETE_PROJECT', projectId)
  }
}
const mutations = {
  SET_PROJECTS(state, payload) {
    state.projects = payload
  },
  UPDATE_PROJECT_AGG(state, { id, aggregations }) {
    state.projects.forEach((item) => {
      if (item._id === id) {
        item.aggregations = aggregations
        const buckets = aggregations.last7d.match_per_day.buckets
        const doc_count = buckets[buckets.length - 1]
          ? buckets[buckets.length - 1].doc_count
          : 0
        item.last24 = doc_count
      }
    })
  },
  UPDATE_PROJECTS(state, projectId) {
    getProject(projectId).then((project) => {
      let projects = cloneDeep(state.projects)
      let index = projects.findIndex((x) => x._id === project._id)
      projects[index] = project
      state.projects = projects
    })
  },
  ADD_PROJECT(state, projectId) {
    getProject(projectId).then((project) => {
      let projects = cloneDeep(state.projects)
      projects.push(project)
      state.projects = projects
    })
  },
  DELETE_PROJECT(state, projectId) {
    let projects = cloneDeep(state.projects)
    let index = projects.findIndex((x) => x._id === projectId)
    projects.splice(index, 1)
    state.projects = projects
  },
  SET_CURRENT_PROJECT(state, project) {
    state.currentProject = project
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
