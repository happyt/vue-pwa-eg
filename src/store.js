import Vue from 'vue'
import Vuex from 'vuex'

import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scores: [
      {
        name: 'abc',
        score: 12
      },
      {
        name: 'fred',
        score: 17
      }
    ],
    loadedScores: [],
    loading: false,
    error: null

  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoadedMeetups (state, payload) {
      state.loadedScores = payload
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then((data) => {
        const scores = []
        const obj = data.val()
        for (let key in obj) {
          console.log(key)
          scores.push({
            title: obj[key].title
          })
        }
        commit('setLoadedScores', scores)
        commit('setLoading', false)
      }) 
      .catch ( (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      )
    }
  }
})
