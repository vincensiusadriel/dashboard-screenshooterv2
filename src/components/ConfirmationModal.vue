<template>
  <div :class="{ modal: true, 'is-active': value }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="close"
          v-if="!isHideClose"
        ></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot" style="justify-content: flex-end">
        <button class="button is-danger" @click="noClick" v-if="noText != ''">
          {{ noText }}
        </button>
        <button
          :class="{
            'button is-success is-pulled-right': true,
            'is-loading': isLoadingButton,
          }"
          @click="yesClick"
        >
          {{ yesText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHideClose: {
      type: Boolean,
      default: false,
    },
    closeOnYes: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    yesText: {
      type: String,
      default: "",
    },
    noText: {
      type: String,
      default: "",
    },
    isLoadingButton: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    yesClick() {
      this.$emit("onYes");
      if (!this.closeOnYes) return;
      this.close();
    },
    noClick() {
      this.$emit("onNo");
      this.close();
    },
    close() {
      this.$emit("input", false);
    },
  },
};
</script>
