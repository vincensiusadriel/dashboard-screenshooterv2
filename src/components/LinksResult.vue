<template>
  <div class="" v-if="currentLinkResult != null">
    <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <div class="container">
                <h5 >{{ currentLinkResult.key }}</h5>
              </div>
            </div>
          </section>
    <div class="tabs">
      <ul>
        <li
          :class="{ 'is-active': currentShow == 'image' }"
          v-if="currentLinkResult.image != null"
          @click="currentShow = 'image'"
        >
          <a>Image</a>
        </li>
        <li
          :class="{ 'is-active': currentShow == 'json' }"
          v-if="currentLinkResult.scrapper != null"
          @click="currentShow = 'json'"
        >
          <a>JSON</a>
        </li>
        <li
          :class="{ 'is-active': currentShow == 'table' }"
          v-if="currentLinkResult.scrapper != null"
          @click="
            currentShow = 'table';
            search = '';
          "
        >
          <a>Table</a>
        </li>
      </ul>
    </div>

    <div v-if="currentShow == 'image'">
      <img
        class="mt-4"
        v-if="currentLinkResult != null"
        :src="'file://' + currentLinkResult.image + `?rnd=${counter}`"
        style="cursor: pointer"
        @click="isShowImage = true"
      />

      <div
        :class="{ modal: true, 'is-active': isShowImage }"
        v-if="currentLinkResult != null"
      >
        <div class="modal-content" style="overflow-y: scroll">
          <img
            :src="'file://' + currentLinkResult.image + `?rnd=${counter}`"
            alt=""
          />
        </div>
        <button
          class="modal-close delete is-large"
          style="background-color: rgba(10, 10, 10, 0.3)"
          aria-label="close"
          @click="isShowImage = false"
        ></button>
      </div>
    </div>

    <div v-if="currentShow == 'json'">
      <pre><code class="hljs is-size-7" v-html="highlightJson"></code></pre>
    </div>

    <div v-if="currentShow == 'table'">
      <div class="control has-icons-left">
        <input
          type="text"
          class="input"
          placeholder="Search"
          v-model="search"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </div>
      <table class="table is-fullwidth is-size-7">
        <thead>
          <tr>
            <th><abbr title="Key">Key</abbr></th>
            <th><abbr title="Value">Value</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredScrapper" :key="item">
            <th>{{ item }}</th>
            <td>{{ stringToValue[item] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
export default {
  props: {
    currentLinkResult: {
      type: Object,
      default: null,
    },
    counter: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentShow: "image",
      isShowImage: false,
      search: "",
    };
  },
  computed: {
    highlightJson() {
      const obj = this.currentLinkResult.scrapper;
      const jsonPretty = JSON.stringify(obj, null, 4);
      hljs.registerLanguage("json", json);
      let res = hljs.highlight(jsonPretty, {
        language: "json",
      }).value;
      return res;
    },
    stringToValue() {
      if (this.currentLinkResult == null) return {};

      const obj = this.currentLinkResult.scrapper;
      return obj;
    },
    filteredScrapper() {
      if (this.currentLinkResult == null) return [];
      const obj = this.currentLinkResult.scrapper;
      return Object.keys(obj).filter((x) =>
        x.toString().toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {},
  watch: {
    currentLinkResult() {
      this.currentShow = "image";
    },
  },
};
</script>

<style>
@import "~highlight.js/styles/stackoverflow-dark.css";
</style>
