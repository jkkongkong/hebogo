<!--
 * @Author: your name
 * @Date: 2021-06-18 16:53:46
 * @LastEditTime: 2021-07-02 15:43:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\components\label\LabelSelect.vue
-->
<template>
  <div>
    <el-dialog title="选择标签" :close-on-click-modal="false" width="600px" append-to-body class="label-select" v-bind="$attrs" @close="closeDialog">
      <div class="content" v-loading.fullscreen="isLoading">
        <el-row class="labels" v-show="selectLabels.length">
          <el-col :span="3"> 已选标签:</el-col>
          <el-col :span="21" class="selected-labels">
            <el-tag v-for="(item, index) in selectLabels" :key="index" size="mini" :closable="isShowCheckbox" @close="deleteLabel(index)">{{ item.label }}</el-tag>
          </el-col>
        </el-row>
        <el-input placeholder="标签名称/编号/关键词" v-model.trim="searchKey" :maxlength="30" class="input-with-select" size="mini" @keyup.enter.native="searchLabel">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="searchLabel"></el-button
        ></el-input>
        <el-tree :data="labelTrees" :props="defaultProps" node-key="value" :filter-node-method="filterNode" @node-click="handleNodeClick" class="label-tree" ref="labelTree" v-bind="$attrs" @check="checkHandler">
          <span class="custom-tree-node" slot-scope="{ data }">
            <span class="label-name">{{ data.label || "" }}</span>
          </span>
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getAllTrees } from "@/http/modules/labelManage";

export default Vue.extend({
  name: "LabelSelect",
  props: {
    //选择机构数量上限
    max: {
      type: Number,
      default: 10,
    },
  },
  components: {},
  data() {
    return {
      searchKey: null,
      defaultProps: {
        children: "children",
        label: "label",
      },
      labelTrees: [],
      selectLabels: [],
      isLoading: false,
      isShowCheckbox: false,
    };
  },
  computed: {
    selectLabelLen() {
      return this.selectLabels.length;
    },
  },
  watch: {
    searchKey(cur, pre) {
      if (!cur && pre != null) {
        this.$refs.labelTree.filter(cur);
      }
    },
    selectLabelLen(cur) {
      if (cur > this.max) {
        this.$message.warning(`最多只能选择${this.max}个标签`);
        this.selectLabels = this.selectLabels.slice(0, 10);
      }
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      let re = await getAllTrees({ searchKey: "*" });
      this.isLoading = false;
      if (re && re.length) {
        this.labelTrees = [...re];
        this.changeLabelList(this.labelTrees);
        this.$nextTick(() => {
          //获取选中标签，显示在已选标签那里，标签的回显 在外部通过props传入了
          const defaultSelectNode = this.$refs.labelTree.getCheckedNodes();
          defaultSelectNode.map((item) => {
            this.selectLabels.push({ label: item.label, value: item.value });
          });
          //是否需要显示多选框
          this.isShowCheckbox = this.$refs.labelTree.$props.showCheckbox;
        });
      }
    } catch (e) {
      console.log(e);
      this.isLoading = false;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    /**
     * @description: 标签树过滤方法
     * @param {*} value
     * @param {*} data
     * @return {*}
     */
    filterNode(value, data) {
      return data.label.indexOf(value) != -1 || data.value.indexOf(value) != -1;
    },
    /**
     * @description: 标签点击回调函数
     * @param {*} node：标签对象
     * @return {*}
     */
    handleNodeClick(node) {
      if (!this.isShowCheckbox) {
        this.selectLabels = [{ label: node.label, value: node.value }];
      }
    },
    /**
     * @description: 过滤搜索标签
     * @param {*}
     * @return {*}
     */
    searchLabel() {
      this.searchKey && this.$refs.labelTree.filter(this.searchKey);
    },
    confirm() {
      this.$emit("change", this.selectLabels);
      this.closeDialog();
    },
    /**
     * @description: 标签树选中回调
     * @param {*} data
     * @param {*} obj
     * @return {*}
     */
    checkHandler(data, obj) {
      if (obj.checkedNodes.length > this.max) {
        this.$message.warning(`最多只能选择${this.max}个标签`);
        return;
      }
      this.selectLabels = [];
      if (obj && obj.checkedNodes) {
        obj.checkedNodes.map((item) => {
          this.selectLabels.push({ label: item.label, value: item.value });
        });
      }
    },
    /**
     * @description: 标签tag删除回调
     * @param {*}
     * @return {*}
     */
    deleteLabel(index) {
      this.$refs.labelTree.setChecked(this.selectLabels[index], false, false);
      this.selectLabels.splice(index, 1);
    },
    /**
     * @description:给标签添加label和value字段
     * @param {*}
     * @return {*}
     */
    changeLabelList(list) {
      list.forEach((item) => {
        item.label = item.name;
        item.value = item.tagId;
        if (item.children && item.children.length) {
          this.changeLabelList(item.children);
        }
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.label-select {
  margin: 40px 0 0;
  .content {
    background: #f7f7f7;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: left;
    padding: 22px 19px;
    display: flex;
    flex-direction: column;
    .label-tree {
      margin-top: 10px;
      max-height: 300px;
      overflow-y: auto;
    }
    .input-with-select {
      .el-input-group__append {
        background: #66b1ff !important;
        color: white;
      }
    }
    .labels {
      margin-bottom: 10px;
    }
    .selected-labels {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
<style lang="scss">
.label-select .input-with-select .el-input-group__append {
  background: #66b1ff !important;
  color: white;
}
</style>
<style lang="scss">
.label-select .el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
