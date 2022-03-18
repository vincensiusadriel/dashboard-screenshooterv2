<template>
  <div
    ref="editable"
    class="textarea is-small"
    contenteditable
    v-on="listeners"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  mounted() {
    this.$refs.editable.innerText = this.value;
    this.$refs.editable.innerHTML = this.replaceWithVar(
      this.value,
      this.globalVar
    );
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.innerText);
    },
    onBlur(e) {
      this.$refs.editable.innerHTML = this.replaceWithVar(
        e.target.innerText,
        this.globalVar
      );
    },
    replaceWithVar(toReplace, globalVar) {
      if (toReplace == null || toReplace == "") return "";
      if (!(typeof toReplace == "string")) return "";
      if (globalVar == null) return toReplace;

      let i = 0;
      let lengthToReplace = toReplace.length;
      let finishString = "";
      let variableName = "";
      let startVar = false;
      while (i < lengthToReplace) {
        if (startVar == true && toReplace[i] == "{") {
          finishString += toReplace[i] + variableName;
        }

        if (toReplace[i] == "{") {
          variableName = "";
          startVar = true;
        } else if (toReplace[i] == "}" && startVar == true) {
          let val = globalVar[variableName];
          if (val != null) {
            finishString += `<span class='has-background-success	has-text-white'>{${variableName}}</span>`;
          } else {
            finishString += `<span class='has-background-danger	has-text-white'>{${variableName}}</span>`;
          }

          variableName = "";
          startVar = false;
        } else {
          if (startVar == true) {
            variableName += toReplace[i];
          } else {
            finishString += toReplace[i];
          }
        }
        i++;
      }

      if (startVar) {
        finishString += `{${variableName}`;
      }

      try {
        let result = eval(finishString);
        return result == null ? "" : result;
      } catch (error) {
        return finishString;
      }
    },
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput, blur: this.onBlur };
    },
    globalVar() {
      return this.$store.getters.globalVar;
    },
  },
  watch: {
    globalVar(oldVal) {
      this.$refs.editable.innerHTML = this.replaceWithVar(this.value, oldVal);
    },
  },
};
</script>

<style scoped>
div {
  resize: both;
  overflow: scroll;
}
</style>
