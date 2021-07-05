<!--
 * @Author: your name
 * @Date: 2021-05-19 15:06:57
 * @LastEditTime: 2021-06-28 15:59:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentRecommend\CreateRules.vue
-->
<template>
  <div>
    <el-dialog title="规则详情" :close-on-click-modal="false" width="900px" append-to-body class="rule-details" v-bind="$attrs" @close="closeDialog">
      <div class="content" v-loading.fullscreen="isLoading">
        <el-row>
          <span class="title">标题</span>
        </el-row>
        <el-row>
          <span class="value">{{ rules.name }}</span>
        </el-row>
        <el-row>
          <span class="title">内容</span>
        </el-row>
        <el-row>
          <span class="value">{{ rules.description }}</span>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <span class="title">用户组</span>
            <span class="value" v-for="(item, index) in rules.userTagList" :key="index">{{ item.label }}</span>
          </el-col>
          <el-col :span="12">
            <span class="title">资源组</span>
            <span class="value" v-for="(item, index) in rules.resTagList" :key="index">{{ item.label }}</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryRuleDetails } from "@/http/modules/contentRecommend";
export default {
  name: "RuleDetails",
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {},
  data() {
    return {
      rules: {
        name: "",
        description: "",
        userTagList: [],
        resTagList: [],
        isLoading: false,
      },
    };
  },
  watch: {
    id(cur) {
      if (cur) {
        this.queryDetails();
      }
    },
  },
  mounted() {
    this.queryDetails();
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    async queryDetails() {
      this.isLoading = true;
      let temp = { pushRuleId: this.id };
      this.userTagList = [];
      this.resTagList = [];
      let re = await queryRuleDetails(temp);
      console.log(re);
      if (re) {
        // this.rules = re;
        this.rules.name = re.name || "";
        this.rules.description = re.description || "";
        if (re.userTagList && re.userTagList.length) {
          this.rules.userTagList = re.userTagList.map((item) => {
            return { label: item.name, value: item.id };
          });
        }
        if (re.resTagList && re.resTagList.length) {
          this.rules.resTagList = re.resTagList.map((item) => {
            return { label: item.name, value: item.id };
          });
        }
        console.log(this.rules);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.rule-details {
  .content {
    background: #f7f7f7;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: left;
    padding: 22px 19px;
    max-height: 600px;
    overflow-y: auto;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      display: block;
    }
    .value {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 20px;
      color: #333333;
      letter-spacing: 0;
      display: block;
      margin: 10px 0 20px 0;
    }
  }
  text-align: left;
}
</style>
