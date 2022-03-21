import Vue from "vue";

const state = {
  globalVar: {},
};

const mutations = {
  ADD_EDIT_GLOBALVAR(state, value) {
    if (value == null) return;

    Vue.set(state.globalVar, value.key, value.value);
  },
  DELETE_GLOBALVAR(state, value) {
    if (value == null) return;

    Vue.delete(state.globalVar, value.key);
  },
  SET_GLOBALVAR(state, value) {
    if (value == null) return;

    state.globalVar = {};

    let keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (value[key] == null) continue;
      if (!(typeof value[key] == "string")) continue;

      Vue.set(state.globalVar, key, value[key]);
    }
  },
};

const getters = {
  globalVar(state) {
    return state.globalVar;
  },
};

export default {
  state,
  mutations,
  getters,
};
