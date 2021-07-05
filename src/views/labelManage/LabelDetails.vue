<template>
  <div>
    <el-dialog title="标签详情" :close-on-click-modal="false" width="900px" class="rule-details" v-bind="$attrs" append-to-body destroy-on-close @close="closeDialog">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <el-row class="title">标签名称 </el-row>
            <el-row class="value">{{ details.name }} </el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="title">标签编号 </el-row>
            <el-row class="value">{{ details.tagId }} </el-row>
          </el-col>
          <el-col :span="6">
            <!-- <el-row class="title">标签来源 </el-row>
            <el-row class="value">{{ details.tagSource }} </el-row> -->
          </el-col>
          <el-col :span="6">
            <el-row class="title">标签类型 </el-row>
            <el-row class="value">{{ details.type }} </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-row class="title">标签用户数 </el-row>
            <el-row class="value">{{ details.affectUserNum > 0 ? details.affectUserNum : 0 }} </el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="title">启停状态 </el-row>
            <el-row class="value">{{ details.isOn ? "启用" : "停用" }} </el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="title">更新时间 </el-row>
            <el-row class="value">{{ formatTime(details.updateTime) }} </el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="title">创建时间 </el-row>
            <el-row class="value">{{ formatTime(details.createTime) }} </el-row>
          </el-col>
        </el-row>
        <!-- <span class="title">创建者</span>
        <span class="value">{{ details.creator_name }}</span> -->
        <span class="title">标签描述</span>
        <span class="value">{{ details.description }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatTime1 } from "@/utils/format";
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
    return {
      types: {
        user: "用户标签",
        content: "内容标签",
        interest: "兴趣标签",
        group: "组合标签",
      },
    };
  },
  mounted() {
    console.log(123);
  },
  methods: {
    formatTime: formatTime1,
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
