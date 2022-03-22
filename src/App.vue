<template>
  <div>
    <!-- START NAV -->
    <NavigationBar />
    <!-- END NAV -->
    <div class="container">
      <div class="columns">
        <div
          class="column is-hidden-mobile is-one-quarter"
          style="overflow-y: scroll; height: 100vh"
        >
          <SideBar @change="navigate"></SideBar>
          <br />
          <br />
        </div>
        <div
          class="column is-three-quarters"
          style="overflow-y: scroll; height: 100vh"
        >
          <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">Dashboard Screenshooter</h1>
                <h2 class="subtitle">(⌐■_■)-︻╦╤─</h2>
              </div>
            </div>
          </section>

          <section class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
              <div class="tile is-parent" ref="save">
                <article class="tile is-child box">
                  <button
                    @click="saveConfiguration"
                    :class="{
                      'button is-primary': true,
                      'is-loading': isLoading,
                    }"
                  >
                    Save Current Configuration
                  </button>
                  <p class="subtitle mt-2" v-if="isSaved && !isLoading">
                    Successfully saved
                  </p>
                </article>
              </div>
              <!-- <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">59k</p>
                  <p class="subtitle">Products</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">3.4k</p>
                  <p class="subtitle">Open Orders</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">19</p>
                  <p class="subtitle">Exceptions</p>
                </article>
              </div> -->
            </div>
          </section>

          <div class="columns is-multiline">
            <div class="column is-full">
              <ConfigsVariable ref="main"></ConfigsVariable>
            </div>
            <div class="column is-full">
              <GlobalVariable ref="global"></GlobalVariable>
            </div>
            <div class="column is-full">
              <confluence-config ref="confluence"></confluence-config>
            </div>
            <div class="column is-full">
              <LinksConfig ref="dashboard" :forwarder="forwarder"></LinksConfig>
            </div>

            <!-- <div class="column is-half">
              <div class="card mb-5">
                <header class="card-header">
                  <p class="card-header-title">Inventory Search</p>
                  <a
                    href="#"
                    class="card-header-icon"
                    aria-label="more options"
                  >
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div class="card-content">
                  <div class="content">
                    <div class="control has-icons-left has-icons-right">
                      <input
                        class="input is-large"
                        type="text"
                        placeholder=""
                      />
                      <span class="icon is-medium is-left">
                        <i class="fa fa-search"></i>
                      </span>
                      <span class="icon is-medium is-right">
                        <i class="fa fa-check"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">User Search</p>
                  <a
                    href="#"
                    class="card-header-icon"
                    aria-label="more options"
                  >
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div class="card-content">
                  <div class="content">
                    <div class="control has-icons-left has-icons-right">
                      <input
                        class="input is-large"
                        type="text"
                        placeholder=""
                      />
                      <span class="icon is-medium is-left">
                        <i class="fa fa-search"></i>
                      </span>
                      <span class="icon is-medium is-right">
                        <i class="fa fa-check"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>

          <!-- <button @click="someTest" class="button is-primary">Test</button> -->
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import ConfigsVariable from "./components/ConfigsVariable.vue";
import GlobalVariable from "./components/GlobalVariable.vue";
import LinksConfig from "./components/LinksConfig.vue";
import NavigationBar from "./components/NavigationBar.vue";

import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import ConfluenceConfig from "./components/ConfluenceConfig.vue";

export default {
  name: "App",
  data() {
    return {
      forwarder: "",
      isSaved: false,
      isLoading: false,
    };
  },
  components: {
    SideBar,
    GlobalVariable,
    ConfigsVariable,
    LinksConfig,
    NavigationBar,
    ConfluenceConfig,
  },
  methods: {
    async someTest() {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://youtube.com");
      const buffer = await page.screenshot({ type: "png", fullPage: true });

      const configsPath = path.join(this.$store.getters.Path, "images.png");

      fs.writeFileSync(configsPath, buffer);
    },
    saveConfiguration() {
      this.isLoading = true;
      let pathToConfig = path.join(this.Path, "config.json");
      let data = {
        email: this.$store.getters.email,
        apiKey: this.$store.getters.apiKey,
        configs: this.$store.getters.configs,
        globalVar: this.$store.getters.globalVar,
        links: this.$store.getters.links,
      };

      fs.writeFileSync(pathToConfig, JSON.stringify(data, null, 4));

      this.isSaved = true;
      this.isLoading = false;
    },
    navigate(key) {
      const el = this.$refs[key]?.$el || this.$refs[key];
      this.forwarder = key;

      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  mounted() {
    let pathToConfig = path.join(this.Path, "config.json");
    let data = JSON.parse(fs.readFileSync(pathToConfig));
    this.$store.commit("SET_CONFIGS", data.configs);
    this.$store.commit("SET_GLOBALVAR", data.globalVar);
    this.$store.commit("SET_LINKS", data.links);
    this.$store.commit("SET_EMAIL", data.email);
    this.$store.commit("SET_API_KEY", data.apiKey);
  },
  computed: {
    Path() {
      return this.$store.getters.Path;
    },
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";
@import "~bulma-tooltip/dist/css/bulma-tooltip.min.css";
html,
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  height: 100%;
  background: #ecf0f3;
}

.menu-label {
  color: #8f99a3;
  letter-spacing: 1.3;
  font-weight: 700;
}
.menu-list a {
  color: #0f1d38;
  font-size: 14px;
  font-weight: 700;
}
.menu-list a:hover {
  background-color: transparent;
  color: #276cda;
}
.menu-list a.is-active {
  background-color: transparent;
  color: #276cda;
  font-weight: 700;
}
.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
}
.card-header-title {
  color: #8f99a3;
  font-weight: 400;
}
.info-tiles {
  margin: 1rem 0;
}
.info-tiles .subtitle {
  font-weight: 300;
  color: #8f99a3;
}
.hero.welcome.is-info {
  background: #36d1dc;
  background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
  background: linear-gradient(to right, #5b86e5, #36d1dc);
}
.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
.card .content {
  font-size: 14px;
}
.card-footer-item {
  font-size: 14px;
  font-weight: 700;
  color: #8f99a3;
}

.card-table .table {
  margin-bottom: 0;
}
.events-card .card-table {
  max-height: 250px;
  overflow-y: scroll;
}

/* .menu {
  position: sticky;
  display: block;
  vertical-align: top;
  max-height: 100vh;
  overflow-y: auto;
  width: 200px;
  top: 0;
  bottom: 0;
}

.content {
  display: block;
} */

.cursor-default {
  cursor: default !important;
}
</style>
