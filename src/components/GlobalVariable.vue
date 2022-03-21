<template>
  <div class="card events-card">
    <header class="card-header">
      <p
        class="card-header-title"
        data-tooltip="Global Variables that that allows dynamic value for dashboards links  cursor-default"
      >
        Global Variable
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
      <article v-show="!isHide" class="post">
        <div class="content">
          <table class="table is-fullwidth is-striped">
            <tbody>
              <tr>
                <td
                  class="is-vcentered"
                  v-if="globalVarArray.length == 0 && !isAdd"
                  colspan="100%"
                  style="text-align: center"
                >
                  No Item
                </td>
              </tr>
              <tr v-for="item in globalVarArray" :key="item">
                <td width="50%" class="is-vcentered">{{ item }}</td>
                <td>
                  <div class="control">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="Value"
                      v-model="globalVar[item]"
                    />
                  </div>
                </td>
                <td width="2%">
                  <div
                    class="icon has-text-danger cursor-default"
                    :data-tooltip="'Delete ' + item"
                  >
                    <i
                      @click="DeleteGlobalVar(item)"
                      style="cursor: pointer"
                      class="fa fa-trash is-danger"
                    ></i>
                  </div>
                </td>
              </tr>
              <tr v-if="isAdd">
                <td width="50%">
                  <div class="control">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="Key"
                      v-model="varKey"
                    />
                    <p v-if="isDuplicate" class="has-text-danger is-size-7">
                      Name is duplicate
                    </p>
                  </div>
                </td>
                <td>
                  <div class="control">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="Value"
                      v-model="varValue"
                    />
                  </div>
                </td>
                <td width="2%"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer class="card-footer">
          <a
            v-if="!isAdd"
            @click="isAdd = true"
            class="card-footer-item button is-primary"
            >Add New</a
          >
          <a
            v-if="isAdd"
            @click="CancelGlobalVar"
            class="card-footer-item button is-danger mr-2"
            >Cancel</a
          >
          <a
            v-if="isAdd"
            @click="AddGlobalVar"
            class="card-footer-item button is-success"
            >Save</a
          >
        </footer>
      </article>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHide: false,
      isAdd: false,
      varKey: "",
      varValue: "",
    };
  },
  computed: {
    globalVarArray() {
      return Object.keys(this.$store.getters.globalVar);
    },
    globalVar() {
      return this.$store.getters.globalVar;
    },
    isDuplicate() {
      return this.varKey in this.$store.getters.globalVar;
    },
  },
  methods: {
    AddGlobalVar() {
      if (this.isDuplicate) return;
      if (this.varKey != "" && this.varValue != "") {
        this.$store.commit("ADD_EDIT_GLOBALVAR", {
          key: this.varKey,
          value: this.varValue,
        });
      }
      this.CancelGlobalVar();
    },
    CancelGlobalVar() {
      this.varKey = "";
      this.varValue = "";
      this.isAdd = false;
    },
    DeleteGlobalVar(key) {
      if (key == "" || key == null) return;
      this.$store.commit("DELETE_GLOBALVAR", { key: key });
    },
  },
};
</script>
