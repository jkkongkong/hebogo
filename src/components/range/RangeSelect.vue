<!--
 * @Author: your name
 * @Date: 2021-06-21 19:21:25
 * @LastEditTime: 2021-07-01 16:57:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\components\range\RangeSelect.vue
-->
<template>
  <div>
    <el-dialog :title="type == 1 || type == 6 ? title : title + '(单位：次)'" :close-on-click-modal="false" width="500px" append-to-body class="range-selector" v-bind="$attrs" @close="closeDialog">
      <div class="content">
        <el-form ref="rangeForm" :model="form" label-width="80px">
          <el-form-item :label="type == 1 || type == 6 ? '开始值' : title + ' >'">
            <el-input-number size="mini" v-model.trim="form.start" :min="0" :max="type == 6 ? 10 : 99999" :precision="type == 6 ? 2 : 0" :step="type == 6 ? 0.1 : 1"></el-input-number>
          </el-form-item>
          <el-form-item label="结束值" v-show="type == 1 || type == 6">
            <el-input-number size="mini" v-model.trim="form.end" :min="0" :max="type == 6 ? 10 : 99999" :precision="type == 6 ? 2 : 0" :step="type == 6 ? 0.1 : 1"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RuleDetails",
  props: {
    type: {
      type: Number,
      default: 1,
    },
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  data() {
    return {
      title: "范围选择",
      form: {
        start: 0,
        end: 0,
      },
    };
  },
  watch: {},
  mounted() {
    this.form.start = this.start;
    switch (this.type) {
      case 1:
        this.title = "学习时长(单位：分钟)";
        this.form.end = this.end;
        break;
      case 2:
        this.title = "浏览量";
        break;
      case 3:
        this.title = "点赞量";
        break;
      case 4:
        this.title = "收藏量";
        break;
      case 5:
        this.title = "分享量";
        break;
      case 6:
        this.title = "资源评分(单位：分)";
        this.form.end = this.end;
        break;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    /**
     * @description: 验证开始值和结束值
     * @param {*}
     * @return {*}
     */
    validate() {
      if (this.type == 1 && this.form.start >= this.form.end) {
        this.$message.warning("起始值不能大于等于结束值");
        return false;
      } else {
        return true;
      }
    },
    confirm() {
      if (this.validate()) {
        this.$emit("change", [this.form.start, this.form.end]);
        this.closeDialog();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.range-selector {
  .content {
    background: #f7f7f7;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: left;
    padding: 22px 19px;
    max-height: 600px;
    overflow-y: auto;
    .checkbox {
      margin-left: 10px;
    }
  }
  text-align: left;
}
</style>
