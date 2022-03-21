<template>
  <div class="card events-card">
    <header class="card-header">
      <p
        class="card-header-title cursor-default"
        data-tooltip="Main app configurations when taking screenshots"
      >
        Configuration
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
      <div v-show="!isHide" class="content">
        <article class="post">
          <table class="table is-fullwidth is-striped">
            <tbody>
              <tr>
                <td
                  class="is-vcentered"
                  v-if="configArr.length == 0 && !isAdd"
                  colspan="100%"
                  style="text-align: center"
                >
                  No Item
                </td>
              </tr>
              <tr v-for="item in configArr" :key="item">
                <td class="is-vcentered">{{ label[item] }}</td>
                <td width="50%">
                  <div class="control">
                    <input
                      class="input is-small has-text-right"
                      type="number"
                      placeholder="Value"
                      v-model="configs[item]"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHide: false,
    };
  },
  computed: {
    configArr() {
      return Object.keys(this.$store.getters.configs);
    },
    configs() {
      return this.$store.getters.configs;
    },
    label() {
      return this.$store.getters.configsLabel;
    },
  },
};
</script>
