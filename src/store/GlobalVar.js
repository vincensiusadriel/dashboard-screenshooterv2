import Vue from "vue";

const state = {
  globalVar: {
    begin: "2022-03-03 18:30:00",
    end: "2022-03-03 20:00:00",
    beginTimestamp: "toTimestamp({begin})",
    endTimestamp: "toTimestamp({end})",
    channelId: "319470",
  },
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
