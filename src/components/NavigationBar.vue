<template>
  <nav class="navbar is-white is-fixed-bottom" v-if="countSelected > 0">
    <div class="container">
      <div class="columns is-mobile mx-1 my-1" style="min-width: 100%">
        <div class="column">
          <h4>Selected {{ countSelected }} Dashboards</h4>
          <p v-if="countInvalidUrl > 0" class="has-text-danger is-size-7">
            {{ countInvalidUrl }} has invalid URL
          </p>
        </div>
        <div class="column">
          <button
            class="button is-primary is-pulled-right"
            @click="showFullModal()"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>

    <FullscreenModal v-model="isShowFullModal"></FullscreenModal>
  </nav>
</template>

<script>
import FullscreenModal from "./FullscreenModal.vue";
export default {
  data() {
    return {
      isShowFullModal: false,
    };
  },
  components: {
    FullscreenModal,
  },
  computed: {
    links() {
      return this.$store.getters.links;
    },
    countSelected() {
      return this.linksArr.filter((x) => this.links[x].selected == true).length;
    },
    linksArr() {
      return this.$store.getters.linksArr;
    },
    countInvalidUrl() {
      let selected = this.linksArr.filter(
        (x) => this.links[x].selected == true
      );
      let count = 0;
      for (let i = 0; i < selected.length; i++) {
        let key = selected[i];
        if (!this.isValidHttpUrl(this.links[key].link)) count++;
      }

      return count;
    },
  },
  methods: {
    showFullModal() {
      if (this.countInvalidUrl > 0) return;
      this.isShowFullModal = true;
    },
    isValidHttpUrl(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";
nav.navbar {
  border-top: 4px solid hsl(171, 100%, 41%);
}
.navbar-item.brand-text {
  font-weight: 300;
}
.navbar-item,
.navbar-link {
  font-size: 14px;
  font-weight: 700;
}
</style>
