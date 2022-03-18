import Vue from "vue";
import Vuex from "vuex";

import GlobalVar from "./GlobalVar";
import Config from "./Config";
import Links from "./Links";
import Path from "./Path";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    GlobalVar,
    Config,
    Links,
    Path,
  },
});
