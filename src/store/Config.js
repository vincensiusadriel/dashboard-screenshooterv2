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
  getters,
};
