<!--
 * @Author: your name
 * @Date: 2021-05-17 17:25:58
 * @LastEditTime: 2021-05-17 17:41:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\template\HelloWorld.vue
-->
<template>
  <div class="hello">
    <span>this is a template</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Template",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {
      test: "",
    };
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  margin: 40px 0 0;
}
</style>
