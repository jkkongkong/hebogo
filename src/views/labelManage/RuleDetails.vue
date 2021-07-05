<!--
 * @Author: your name
 * @Date: 2021-05-25 16:07:40
 * @LastEditTime: 2021-05-26 19:44:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\labelManage\RuleDetails.vue
-->
<template>
  <div>
    <el-dialog
      title="规则详情"
      :close-on-click-modal="false"
      width="600px"
      class="rule-details"
      v-bind="$attrs"
      append-to-body
      destroy-on-close
      @close="closeDialog"
    >
      <div class="content">
        <span class="title">标题</span>
        <span class="value">{{ details.name }}</span>
        <span class="title">内容</span>
        <span class="value">{{ details.description }}</span>
        <el-row>
          <el-col :span="12">
            <el-row class="title">用户组 </el-row>
            <el-row v-for="(item, index) in details.userTagList" :key="index" class="value">{{ item }} </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="title">资源组 </el-row>
            <el-row v-for="(item, index) in details.resTagList" :key="index" class="value">{{ item }} </el-row>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RuleDetails",
  props: {
    details: {
      type: Object,
      default() {
        return {
          name: "",
          content: "",
          users: [],
          resource: [],
        };
      },
    },
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    console.log(123);
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.rule-details {
  text-align: left;
  .content {
    background: #f7f7f7;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    letter-spacing: 0;
    text-align: left;
    padding: 22px 19px;
    .title {
      font-size: 12px;
      color: #999999;
    }
    .value {
      font-size: 14px;
      color: #333333;
      margin: 8px 0 17px 0;
      flex-shrink: 0;
      line-height: 22px;
    }
  }
}
</style>
<style lang="scss">
.rule-details .el-dialog__header {
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
}
</style>
