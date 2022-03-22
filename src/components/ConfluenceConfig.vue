<template>
  <div class="card events-card">
    <header class="card-header">
      <p
        class="card-header-title cursor-default"
        data-tooltip="Main app configurations when taking screenshots"
      >
        Confluence Configuration
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
                <td class="is-vcentered">Email</td>
                <td width="50%">
                  <div class="control">
                    <input
                      class="input is-small"
                      type="email"
                      placeholder="Email"
                      v-model="email"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  class="is-vcentered"
                  data-tooltip="Refer to : https://id.atlassian.com/manage-profile/security/api-tokens"
                >
                  Confluence API Key
                </td>
                <td width="50%">
                  <div class="control">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="API Key"
                      v-model="apiKey"
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
    email: {
      get() {
        return this.$store.getters.email;
      },
      set(value) {
        this.$store.commit("SET_EMAIL", value);
      },
    },
    apiKey: {
      get() {
        return this.$store.getters.apiKey;
      },
      set(value) {
        this.$store.commit("SET_API_KEY", value);
      },
    },
  },
};
</script>
