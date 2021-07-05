<!--
 * @Author: your name
 * @Date: 2021-05-17 17:09:17
 * @LastEditTime: 2021-05-20 16:00:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\src\views\Login.vue
-->
<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登录名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from "node_modules/element-ui/types/form";
import Vue from "vue";
import { logining } from "@/http/modules/role";

export default Vue.extend({
  name: "Template",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      const form = this.$refs.ruleForm as ElForm;
      form.validate(async (valid: boolean) => {
        if (valid) {
          const re = await logining(this.ruleForm);
          if (re) {
            this.$message.success("登陆成功！");
            this.$router.push("/");
          }
        } else {
          this.$message.error("登陆失败！");
        }
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
