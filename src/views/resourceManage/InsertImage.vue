<!--
 * @Author: your name
 * @Date: 2021-05-19 15:06:57
 * @LastEditTime: 2021-07-06 16:49:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentRecommend\CreateRules.vue
-->
<template>
  <div>
    <el-dialog title="插入图片" :close-on-click-modal="false" width="600px" height="80%" class="preview-details" v-bind="$attrs" append-to-body destroy-on-close @close="closeDialog">
      <div class="content">
        <el-input v-model.trim="url"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="save" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: {},
  components: {},
  data() {
    return {
      url: null,
    };
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    save() {
      if (this.url) {
        this.$emit("change", this.url);
        this.closeDialog();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.preview-details {
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
.preview-details .el-dialog__header {
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
}
</style>
