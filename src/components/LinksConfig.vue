<template>
  <div class="card events-card">
    <header class="card-header">
      <p
        class="card-header-title cursor-default"
        data-tooltip="Dashboard configuration that list targeted dashboards to be screenshotted and scrapped"
      >
        Dashboards
      </p>
      <a
        @click="isHide = !isHide"
        class="card-header-icon"
        aria-label="more options"
      >
        <span class="icon">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <template>
      <div class="content" v-show="!isHide">
        <article class="post">
          <div class="columns is-multiline is-mobile">
            <div class="column is-full">
              <div class="field">
                <input
                  id="switchRoundedDefault"
                  type="checkbox"
                  name="switchRoundedDefault"
                  class="switch is-rounded"
                  :checked="isHideDetail ? 'checked' : 'unchecked'"
                  v-model="isHideDetail"
                />
                <label class="is-vcentered pt-0" for="switchRoundedDefault"
                  >Hide Details</label
                >
              </div>
            </div>
          </div>
        </article>
        <article class="post">
          <div class="columns is-multiline is-mobile">
            <div class="column is-forth-fifths">
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
            </div>
            <div class="column is-one-fifth">
              <button
                class="button is-primary is-pulled-right"
                @click="isAddMode = true"
                data-tooltip="Add new dashboard"
              >
                Add Link
              </button>
            </div>
          </div>
        </article>
        <article class="post" v-if="isAddMode">
          <div class="columns is-mobile">
            <div class="column is-two-thirds">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="Dashboard Name"
                  v-model="varName"
                />
                <p class="is-size-7 has-text-danger" v-if="isDuplicate">
                  Name is duplicate
                </p>
                <p
                  v-if="isEmpty && varName == ''"
                  class="has-text-danger is-size-7"
                >
                  Name is empty
                </p>
              </div>
            </div>
            <div class="column">
              <div class="is-flex is-justify-content-flex-end">
                <button class="button is-danger" @click="CancelLink">
                  Cancel
                </button>
                <button class="button is-primary ml-2" @click="AddLink">
                  Save
                </button>
              </div>
            </div>
          </div>
        </article>
        <article class="post">
          <div class="columns is-mobile">
            <div class="column is-full">
              <button
                class="button is-primary"
                @click="ToggleSelectedAll"
                data-tooltip="Select/Unselect All/Filtered"
              >
                Toggle {{ search == "" ? "All" : "All Searched" }}
              </button>
            </div>
          </div>
        </article>
        <div class="list-config">
          <article
            class="post"
            v-for="item in linksArr"
            :key="item"
            :ref="item"
          >
            <div class="columns is-mobile">
              <div class="column">
                <div class="is-flex">
                  <div class="field">
                    <label
                      class="b-checkbox checkbox"
                      :data-tooltip="'Toggle Selected/Unselected'"
                    >
                      <input type="checkbox" v-model="links[item].selected" />
                      <span class="check"></span>
                    </label>
                  </div>
                  <h4
                    @click.stop="links[item].selected = !links[item].selected"
                    style="cursor: pointer"
                    :data-tooltip="'Dashboard Name'"
                  >
                    {{ item }}
                  </h4>
                </div>
              </div>
              <div class="column">
                <div class="icon has-text-danger is-pulled-right">
                  <i
                    style="cursor: pointer"
                    class="fa fa-trash is-danger"
                    @click="toDelete(item)"
                  ></i>
                </div>
              </div>
              <ConfirmationModal
                v-model="isShowModal"
                :title="'Delete Link'"
                :noText="'Cancel'"
                :yesText="'Confirm'"
                @onYes="DeleteLink()"
              >
                Are you sure you want to delete this link ?</ConfirmationModal
              >
            </div>

            <div class="columns is-multiline is-mobile" v-if="!isHideDetail">
              <div
                class="column pb-0 is-one-fifth cursor-default"
                :data-tooltip="'Dashboard main tag/element selector'"
              >
                Main Selector
              </div>
              <div class="column pb-0 is-four-fifths">
                <div class="control">
                  <input
                    class="input is-small"
                    type="text"
                    placeholder="Main Selector"
                    v-model="links[item].selector"
                  />
                </div>
              </div>
              <div
                class="column is-one-fifth cursor-default"
                :data-tooltip="'Dashboard Link URL'"
              >
                Link URL
              </div>
              <div class="column is-four-fifths">
                <div class="control">
                  <!-- <textarea
                  class="textarea is-small"
                  placeholder="Link URL"
                  v-model="links[item].link"
                  rows="7"
                /> -->
                  <EditableControl v-model="links[item].link"></EditableControl>
                  <p
                    v-if="!isValidHttpUrlMap[item]"
                    class="has-text-danger is-size-7"
                  >
                    Invalid URL
                  </p>
                </div>
              </div>
              <div
                class="column is-one-fifth cursor-default"
                :data-tooltip="'List of selector that contains information'"
              >
                Scrapper
              </div>
              <div class="column is-four-fifths">
                <button
                  class="button is-primary mb-2"
                  @click="AddScrapper(item)"
                >
                  Add Scrapper
                </button>
                <table class="table is-fullwidth is-striped">
                  <tbody>
                    <tr
                      v-for="(scrapper, indexScrapper) in links[item].scrapper"
                      :key="item + ' scrapper ' + indexScrapper"
                    >
                      <td
                        class="is-size-7 cursor-default"
                        :data-tooltip="'The parent element/tag selector that contains the value selector and title selector (if there is any)'"
                      >
                        Parent Selector
                      </td>
                      <td width="80%" class="pr-0">
                        <div class="control">
                          <input
                            class="input is-small"
                            type="text"
                            placeholder="Parent Selector, ex : .some-selector"
                            v-model="scrapper.selector"
                          />
                        </div>
                        <table class="table is-fullwidth is-striped">
                          <tbody>
                            <tr>
                              <td
                                class="is-size-7 cursor-default"
                                :data-tooltip="'The element/tag selector that contains the title(if there is any)'"
                              >
                                Title Selector
                              </td>
                              <td width="80%" class="pr-0">
                                <div class="control">
                                  <input
                                    class="input is-small"
                                    type="text"
                                    placeholder="Title Selector, ex : #some-title-selector-inside-parent"
                                    v-model="scrapper.titleSelector"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="is-size-7 cursor-default"
                                :data-tooltip="'Title text if there is no title selector'"
                              >
                                Title Text (Optional)
                              </td>
                              <td width="80%" class="pr-0">
                                <div class="control">
                                  <input
                                    class="input is-small"
                                    type="text"
                                    placeholder="Title Text, this will be replaced if title selector is filled"
                                    v-model="scrapper.titleText"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="is-size-7 cursor-default"
                                :data-tooltip="'The element/tag selector that contains the value (can be more than 1 in the same parent selector)'"
                              >
                                Value Selector
                              </td>
                              <td width="80%" class="pr-0">
                                <button
                                  class="button is-primary is-small is-pulled-right"
                                  @click="AddValueSelector(item, indexScrapper)"
                                >
                                  Add Value Selector
                                </button>
                              </td>
                            </tr>
                            <tr
                              v-for="(
                                _, indexSelector
                              ) in scrapper.valueSelector"
                              :key="
                                item +
                                ' scrapper ' +
                                indexScrapper +
                                ' valueSelector ' +
                                indexSelector
                              "
                            >
                              <td>
                                <div
                                  class="icon cursor-default"
                                  :data-tooltip="
                                    'Value selector ' + (indexSelector + 1)
                                  "
                                >
                                  <i class="fa fa-arrow-right"></i>
                                </div>
                              </td>
                              <td width="80%">
                                <div class="columns is-mobile">
                                  <div class="column is-10">
                                    <div class="control">
                                      <input
                                        class="input is-small"
                                        type="text"
                                        placeholder="Value Selector, ex : #some-value-selector-inside-parent"
                                        v-model="
                                          scrapper.valueSelector[indexSelector]
                                        "
                                      />
                                    </div>
                                  </div>
                                  <div class="column is-2">
                                    <div
                                      class="icon has-text-danger cursor-default"
                                      :data-tooltip="
                                        'Delete value selector ' +
                                        (indexSelector + 1)
                                      "
                                    >
                                      <i
                                        style="cursor: pointer"
                                        class="fa fa-trash is-danger"
                                        @click="
                                          DeleteValueSelector(
                                            item,
                                            indexScrapper,
                                            indexSelector
                                          )
                                        "
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <div
                          class="icon has-text-danger cursor-default"
                          :data-tooltip="
                            'Delete scrapper ' + (indexScrapper + 1)
                          "
                        >
                          <i
                            style="cursor: pointer"
                            class="fa fa-trash is-danger"
                            @click="DeleteScrapper(item, indexScrapper)"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import EditableControl from "./EditableControl.vue";
import ConfirmationModal from "./ConfirmationModal.vue";

export default {
  components: {
    EditableControl,
    ConfirmationModal,
  },
  props: {
    forwarder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isHide: false,
      isAddMode: false,
      isShowModal: false,
      isHideDetail: false,
      varName: "",
      isEmpty: false,
      deleteKey: "",
    };
  },
  computed: {
    linksArr() {
      return this.$store.getters.linksArr.filter((x) => {
        return x.toString().toLowerCase().includes(this.search.toLowerCase());
      });
    },
    links() {
      return this.$store.getters.links;
    },
    isDuplicate() {
      return this.varName in this.$store.getters.links;
    },
    search: {
      get() {
        return this.$store.getters.search;
      },
      set(value) {
        this.$store.commit("SET_SEARCH", value);
      },
    },
    isValidHttpUrlMap() {
      let arr = Object.keys(this.links);
      let len = arr.length;
      let obj = {};
      for (let i = 0; i < len; i++) {
        obj[arr[i]] = this.isValidHttpUrl(this.links[arr[i]].link);
      }

      return obj;
    },
  },
  methods: {
    isValidHttpUrl(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
    AddScrapper(key) {
      this.$store.commit("ADD_SCRAPPER", { key: key });
    },
    DeleteScrapper(key, index) {
      this.$store.commit("DELETE_SCRAPPER", { key: key, index: index });
    },
    AddValueSelector(key, indexScrapper) {
      this.$store.commit("ADD_VALUE_SELECTOR", {
        key: key,
        indexScrapper: indexScrapper,
      });
    },
    DeleteValueSelector(key, indexScrapper, indexSelector) {
      this.$store.commit("DELETE_VALUE_SELECTOR", {
        key: key,
        indexScrapper: indexScrapper,
        indexSelector: indexSelector,
      });
    },
    CancelLink() {
      this.varName = "";
      this.isEmpty = false;
      this.isAddMode = false;
    },
    AddLink() {
      if (this.isDuplicate) return;
      if (this.varName == "") {
        this.isEmpty = true;
        return;
      }

      this.isEmpty = false;

      this.$store.commit("ADD_LINK", this.varName);

      this.CancelLink();
    },
    DeleteLink() {
      this.$store.commit("DELETE_LINK", this.deleteKey);
    },
    toDelete(key) {
      this.isShowModal = true;
      this.deleteKey = key;
    },
    ToggleSelectedAll() {
      let len = this.linksArr.length;

      //if some are false then set all to true, else then set all to false
      let value = this.linksArr.some((x) => this.links[x].selected == false);

      for (let i = 0; i < len; i++) {
        this.$store.commit("TOGGLE_SELECTED", {
          key: this.linksArr[i],
          value: value,
        });
      }
    },
  },
  watch: {
    forwarder(key) {
      let el = this.$refs[key];

      if (el != null && el.length > 0) {
        el = el[0];
      }
      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style lang="css">
@import "~bulma/css/bulma.css";
@import "~bulma-switch/dist/css/bulma-switch.min.css";
@import "~bulma-checkbox/css/main.min.css";

.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}

.menu-list li {
  padding: 5px;
}

.list-config {
  /* overflow-y: scroll;
  max-height: 1000px; */
}
</style>
