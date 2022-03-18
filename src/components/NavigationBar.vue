<template>
  <nav class="navbar is-white is-fixed-bottom" v-if="countSelected > 0">
    <div class="container">
      <div class="columns is-mobile mx-1 my-1" style="min-width: 100%">
        <div class="column">
          <h4>Selected {{ countSelected }} Dashboards</h4>
        </div>
        <div class="column">
          <button
            class="button is-primary is-pulled-right"
            @click="isShowFullModal = true"
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
