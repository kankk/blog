import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const fetchHomeData = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise Data');
    }, 1000)
    ;
  });
};

function createStore () {
  const store = new Vuex.Store({
    state: {
      content: 'Init Data'
    },
    actions: {
      fetchHomeData ({ commit }) {
        return fetchHomeData().then(data => {
          commit('SET_HOEM_CONTENT', data);
        }).catch(err => {
          console.error(err);
        });
      }
    },
    mutations: {
      'SET_HOEM_CONTENT' (state, data) {
        state.content = data;
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  }

  return store;
}

export default createStore;
