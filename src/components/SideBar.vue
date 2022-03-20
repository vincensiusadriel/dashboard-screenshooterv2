<template>
  <aside class="menu is-hidden-mobile mt-4 ml-4">
    <p class="menu-label">Config</p>
    <ul class="menu-list">
      <li><a @click="changeTab('main')">Main Configuration</a></li>
      <li><a @click="changeTab('global')">Global Variable</a></li>
      <li><a @click="changeTab('dashboard')">Dashboards</a></li>
      <li>
        <ul>
          <li>
            <a @click="changeTab(item)" v-for="item in linksArr" :key="item">{{
              item
            }}</a>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <p class="menu-label">Administration</p>
    <ul class="menu-list">
      <li><a>Team Settings</a></li>
      <li>
        <a>Manage Your Team</a>
        <ul>
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
          <li><a>Remove a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
      <li><a>Payments</a></li>
    </ul>
    <p class="menu-label">Transactions</p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
      <li><a>Reports</a></li>
    </ul> -->
  </aside>
</template>

<script>
export default {
  methods: {
    changeTab(key) {
      this.$emit("change", key);
    },
  },
  computed: {
    search() {
      return this.$store.getters.search;
    },
    linksArr() {
      return this.$store.getters.linksArr.filter((x) => {
        return x.toString().toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
