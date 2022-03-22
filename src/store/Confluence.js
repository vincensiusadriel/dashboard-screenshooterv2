const state = {
  email: "",
  apiKey: "",
};

const mutations = {
  SET_EMAIL(state, value) {
    state.email = value;
  },
  SET_API_KEY(state, value) {
    state.apiKey = value;
  },
};

const getters = {
  email(state) {
    return state.email;
  },
  apiKey(state) {
    return state.apiKey;
  },
};

export default {
  state,
  mutations,
  getters,
};
