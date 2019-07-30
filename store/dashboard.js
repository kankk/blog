const state = () => {
  return {
    isAuthenticated: false,
    token: ''
  }
}

// const getters = {
//   isAuthenticated: state => state.isAuthenticated
// }

const actions = {

}

const mutations = {
  initDashboard (state) {
    state.isAuthenticated = false
    state.token = ''
  },
  updateAuthenticated (state, data) {
    state.isAuthenticated = !!data
  },
  updateToken (state, token) {
    state.token = token
  }
}

export default {
  state,
  // getters,
  actions,
  mutations
}
