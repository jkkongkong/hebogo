<!--
 * @Author: your name
 * @Date: 2021-05-28 09:23:14
 * @LastEditTime: 2021-06-01 16:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\InterfaceTest.vue
-->
<template>
  <div class="innterface-test">
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6">
          <span class="title">functionCode</span>
          <el-input v-model="funcCode" placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="6">
          <span class="title">transactionId</span>
          <el-input v-model="transactionId" placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="6">
          <span class="title">serviceId</span>
          <el-input v-model="serviceId" placeholder="请输入"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" @click="send" :disabled="disable">发送请求</el-button>
        <el-button @click="reset">重置数据</el-button>
      </el-row>
      <div class="row">
        <span class="title"> 请求参数(json字符串格式，如：{ "parentTagId":-1, "startIndex":1, "pageSize":20 }) </span>
        <el-input
          v-model="params"
          placeholder="请输入接口参数"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 30 }"
        ></el-input>
      </div>
      <div class="row">
        <span class="title"> 响应值 </span>
        <el-input v-model="response" type="textarea" :autosize="{ minRows: 10, maxRows: 30 }"></el-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { common } from "@/http/modules/common";
export default Vue.extend({
  name: "InterfaceTest",
  components: {},
  data() {
    return {
      funcCode: "getSubTagList",
      transactionId: "AP201WC28",
      serviceId: "wbSimpleTransaction",
      params: '{ "parentTagId": -1, "startIndex": 1, "pageSize": 20 }',
      response: "",
    };
  },
  computed: {
    disable() {
      return !this.funcCode;
      // return !this.funcCode || !this.params || !this.transactionId || !this.serviceId;
    },
  },
  methods: {
    reset() {
      this.funcCode = "";
      this.params = "";
      this.response = "";
    },
    async send() {
      let params = "";
      try {
        params = JSON.parse(this.params);
      } catch (e) {
        this.$message.error("请求参数格式错误:" + e);
        return;
      }
      const re: any = await common(this.funcCode, params, this.serviceId, this.transactionId);
      console.log(re);
      if (re && re.result == "SUCCESS") {
        this.$message.success("请求成功");
        this.response = JSON.stringify(re.data);
      } else {
        if (re && re.message) this.$message.error(re.message);
        this.response = "";
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.innterface-test {
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  .content {
    box-sizing: border-box;
    margin: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    background: white;
    overflow-y: auto;
    .el-row {
      padding: 40px;
      .title {
        margin: 0 10px 10px 0;
        display: inline-block;
      }
    }
  }
}
</style>
