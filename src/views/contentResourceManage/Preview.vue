<!--
 * @Author: your name
 * @Date: 2021-05-19 15:06:57
 * @LastEditTime: 2021-06-11 17:29:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentRecommend\CreateRules.vue
-->
<template>
  <div>
    <el-dialog
      title="预览"
      :close-on-click-modal="false"
      width="400px"
      height="80%"
      class="preview-details"
      v-bind="$attrs"
      append-to-body
      destroy-on-close
      @close="closeDialog"
    >
      <div class="ql-container ql-snow">
        <div class="ql-editor content" v-html="details"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: {
    details: {
      type: String,
      default() {
        return "";
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
.preview-details .ql-container.ql-snow {
  border: none !important;
  strong {
    font-weight: bold !important;
  }
}

.preview-details .ql-editor.content {
  max-height: 600px;
  overflow-y: scroll;
}
</style>
