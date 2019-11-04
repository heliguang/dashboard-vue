import { login, logout, getInfo, getAsyncRoutes } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncComponents } from '@/router'

/* Layout */
import Layout from '@/layout'
import V404 from '@/views/404'

export function filterAsyncRoutes(routes) {
  routes.forEach(route => {
    if (route.component) {
      if (route.component === '/layout') {
        route.component = Layout
      } else {
        // TODO:这里不够优雅
        // 期望最后优化为按需加载的模式
        route.component = asyncComponents[route.component] || V404
      }
    }
    if (route.children) {
      route.children = filterAsyncRoutes(route.children)
    }
  })
  return routes
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  asyncRoutes: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ASYNC_ROUTES: (state, routes) => {
    state.asyncRoutes = routes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user: username.trim(), password: password }).then(response => {
        // const { data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)

        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        console.log('login error')
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // const { data } = response
        //
        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }
        //
        // const { name, avatar } = data
        //
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // resolve(data)

        if (!response) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = response

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getAsyncRoutes({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAsyncRoutes(state.token).then(response => {
        const filteredAsyncRoutes = filterAsyncRoutes(response.routes)
        commit('SET_ASYNC_ROUTES', filteredAsyncRoutes)
        resolve(filteredAsyncRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

