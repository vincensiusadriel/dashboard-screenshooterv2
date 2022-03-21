import Vue from "vue";

const state = {
  search: "",
  linksResult: {},
  links: {},
  linksArr: [],
};

const mutations = {
  ADD_LINK_RESULT(state, payload) {
    if (payload == null) return;
    Vue.set(state.linksResult, payload.key, payload.value);
  },
  ADD_LINK(state, value) {
    if (value == "" || value == null) return;

    Vue.set(state.links, value, {
      selected: true,
      selector: "",
      link: "",
      scrapper: [],
    });

    state.linksArr.unshift(value);
  },
  DELETE_LINK(state, value) {
    if (value == null || value == "") return;
    Vue.delete(state.links, value);

    state.linksArr = state.linksArr.filter((x) => x != value);
  },
  ADD_SCRAPPER(state, value) {
    if (value == null) return;
    if (
      state.links[value.key].scrapper.length > 0 &&
      state.links[value.key].scrapper[0].selector == ""
    )
      return;

    state.links[value.key].scrapper.unshift({
      selector: "",
      titleSelector: "",
      titleText: "",
      valueSelector: [],
    });
  },
  DELETE_SCRAPPER(state, value) {
    if (value == null) return;
    if (value.key == "" || value.index < 0) return;

    state.links[value.key].scrapper.splice(value.index, 1);
  },
  ADD_VALUE_SELECTOR(state, value) {
    if (value == null) return;

    let len =
      state.links[value.key].scrapper[value.indexScrapper].valueSelector.length;

    if (
      len > 0 &&
      state.links[value.key].scrapper[value.indexScrapper].valueSelector[
        len - 1
      ] == ""
    )
      return;

    state.links[value.key].scrapper[value.indexScrapper].valueSelector.push("");
  },
  DELETE_VALUE_SELECTOR(state, value) {
    if (value == null) return;
    if (value.key == "" || value.indexScrapper < 0 || value.indexSelector < 0)
      return;

    state.links[value.key].scrapper[value.indexScrapper].valueSelector.splice(
      value.indexSelector,
      1
    );
  },
  TOGGLE_SELECTED(state, payload) {
    if (payload == null) return;

    state.links[payload.key].selected = payload.value;
  },
  SET_SEARCH(state, value) {
    state.search = value;
  },
  SET_LINKS(state, value) {
    if (value == null) return;

    let keys = Object.keys(value);
    state.linksArr = [];
    state.links = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (value[key] == null) continue;

      Vue.set(state.links, key, {
        selected: value[key].selected == null ? true : value[key].selected,
        selector:
          value[key].selector == null ? "" : value[key].selector.toString(),
        link: value[key].link == null ? "" : value[key].link.toString(),
        scrapper: [],
      });

      state.linksArr.push(key);

      if (value[key].scrapper == null) continue;

      for (let j = 0; j < value[key].scrapper.length; j++) {
        if (value[key].scrapper[j] == null) continue;

        let valueSelector =
          value[key].scrapper[j].valueSelector == null
            ? []
            : value[key].scrapper[j].valueSelector;

        let temp = {
          selector:
            value[key].scrapper[j].selector == null
              ? ""
              : value[key].scrapper[j].selector.toString(),
          titleSelector:
            value[key].scrapper[j].titleSelector == null
              ? ""
              : value[key].scrapper[j].titleSelector.toString(),
          titleText:
            value[key].scrapper[j].titleText == null
              ? ""
              : value[key].scrapper[j].titleText.toString(),
          valueSelector: valueSelector.map((x) => x.toString()),
        };

        state.links[key].scrapper.push(temp);
      }
    }
  },
};

const getters = {
  links(state) {
    return state.links;
  },
  linksArr(state) {
    return state.linksArr;
  },
  linksResult(state) {
    return state.linksResult;
  },
  search(state) {
    return state.search;
  },
};

export default {
  state,
  mutations,
  getters,
};
