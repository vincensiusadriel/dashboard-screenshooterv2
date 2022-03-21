import Vue from "vue";

const state = {
  configs: {
    wait: 30,
    timeout: 120,
    layoutHeight: 9000,
    layoutWidth: 5000,
  },
  configsLabel: {
    wait: "Time to Wait in Page (second)",
    layoutHeight: "Window Height (pixel)",
    layoutWidth: "Window Width (pixel)",
    timeout: "Timeout Duration in (second)",
  },
};

const mutations = {
  SET_CONFIGS(state, payload) {
    if (payload == null) return;

    let keys = Object.keys(payload);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (payload[key] == null) continue;
      if (!(key in state)) continue;

      Vue.set(state.configs, key, payload[key]);
    }
  },
};

const getters = {
  configs(state) {
    return state.configs;
  },
  configsLabel(state) {
    return state.configsLabel;
  },
};

export default {
  state,
  mutations,
  getters,
};
