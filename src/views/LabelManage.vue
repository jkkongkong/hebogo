<!--
 * @Author: your name
 * @Date: 2021-05-19 15:23:14
 * @LastEditTime: 2021-07-01 15:58:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\LabelManage.vue
-->

<template>
  <div class="label-manage" v-loading.fullscreen="isLoading">
    <div class="content-box">
      <div class="nav">
        <el-input placeholder="标签名称/编号/关键词" :maxlength="30" v-model.trim="searchKey" class="input-with-select" size="mini" @keyup.enter.native="searchLabel"
          ><el-button slot="append" type="primary" icon="el-icon-search" @click="searchLabel"></el-button
        ></el-input>
        <!-- <el-tree :load="loadMenuLabels" :props="defaultProps" node-key="id" lazy @node-click="handleNodeClick" :filter-node-method="filterNode" class="label-tree" ref="tree"> -->
        <el-tree :data="labelTrees" :props="defaultProps" node-key="id" @node-click="handleNodeClick" :filter-node-method="filterNode" class="label-tree" ref="labelManageTree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i v-if="node.level == 1" :class="data.icon"></i>
            <span class="label-name">{{ data.label || "" }}</span>
          </span>
        </el-tree>
        <!-- <el-tree
          :data="labelTrees"
          :props="defaultProps"
          node-key="id"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          class="label-tree"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i v-if="node.level == 1" :class="data.icon"></i>
            <span class="label-name">{{ data.label || "" }}</span>
          </span>
        </el-tree> -->
      </div>
      <div class="label-content">
        <div class="title">
          <span class="name">{{ currentLabel.name }}</span>
          <span class="number">({{ tableData.length || 0 }}个)</span>
          <span class="user-number"> 用户数：{{ currentLabel.affectUserNum > 0 ? currentLabel.affectUserNum : 0 }}人 </span>
          <span class="user-number" v-show="currentLabel.type">类型：{{ currentLabel.type || "" }}</span>
          <span class="user-number">状态：{{ currentLabel.isOn ? "启用" : "停用" }}</span>
          <span class="user-number" v-show="currentLabel.updateTime"> 更新时间：{{ formatTime(currentLabel.updateTime) }} </span>
          <span class="user-number" v-show="currentLabel.createTime"> 创建时间：{{ formatTime(currentLabel.createTime) }} </span>
          <span class="user-number" v-show="currentLabel.description">
            描述：
            <el-tooltip effect="light" :open-delay="500" :content="currentLabel.description" placement="top">
              <span>{{ currentLabel.description }}</span>
            </el-tooltip>
          </span>
        </div>
        <!-- <div class="actions">
                <el-button size="mini" type="primary" plain @click="deleteMultiple" :disabled="!selectedLabels.length">
                  一键删除
                </el-button>
              </div> -->
        <el-table :data="tableData" ref="labelManageTable" @select="handleTableSelect" @select-all="handleTableSelect" style="width: 100%">
          <!-- <el-table-column type="selection"> </el-table-column> -->
          <el-table-column prop="id" show-overflow-tooltip label="编号"> </el-table-column>
          <el-table-column prop="name" show-overflow-tooltip label="名称"> </el-table-column>
          <!-- <el-table-column prop="tagSource" label="来源" show-overflow-tooltip> </el-table-column> -->
          <el-table-column prop="affectUserNum" label="用户数" show-overflow-tooltip> </el-table-column>
          <el-table-column width="100px" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleTableItemClick(scope.row)" type="text" size="small" class="details">详情</el-button>
              <!-- <el-button type="text" size="small" class="edit">编辑</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <RuleDetails :visible.sync="dialogVisible" :details="details"></RuleDetails> -->
    <LabelDetails :visible.sync="dialogVisible" :details="details"></LabelDetails>
  </div>
</template>

<script>
// import RuleDetails from "@/views/labelManage/RuleDetails";
import LabelDetails from "@/views/labelManage/LabelDetails";
import { getLabels, queryRuleDetails } from "@/http/modules/labelManage";
import { formatTime1 } from "@/utils/format";
import { getAllTrees } from "@/http/modules/labelManage";
export default {
  name: "LabelManage",
  props: {},
  data() {
    return {
      dialogVisible: false,
      searchKey: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [],
      details: {},
      selectedLabels: [],
      currentLabel: { name: "", affectUserNum: 0 },
      isLoading: false,
      labelTrees: [],
    };
  },
  components: {
    LabelDetails,
  },
  // created() {},
  async mounted() {
    try {
      this.isLoading = true;
      let re = await getAllTrees({ searchKey: "*" });
      this.isLoading = false;
      if (re && re.length) {
        this.labelTrees = [...re];
        this.changeLabelList(this.labelTrees);
        this.handleNodeClick(re[0]);
      }
    } catch (e) {
      console.log(e);
      this.isLoading = false;
    }
  },
  watch: {
    searchKey(cur) {
      if (!cur) {
        this.$refs.labelManageTree.filter(cur);
      }
    },
  },
  methods: {
    test() {
      alert(1);
    },
    /**
     * @description: 过滤搜索标签
     * @param {*}
     * @return {*}
     */
    searchLabel() {
      this.searchKey && this.$refs.labelManageTree.filter(this.searchKey);
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
    formatTime: formatTime1,
    /**
     * @description: 导航栏过滤方法
     * @param {*} value
     * @param {*} data
     * @return {*}
     */
    filterNode(value, data) {
      return data.name.indexOf(value) != -1 || data.value.indexOf(value) != -1;
    },
    /**
     * @description: 获取目录的标签
     * @param {*}
     * @return {*}
     */
    async loadMenuLabels(node, resolve) {
      let parameters = {
        parentTagId: "-1",
        startIndex: 1,
        pageSize: 1000,
      };
      if (node.level != 0) {
        parameters.parentTagId = node.data.tagId;
      }
      let re = await getLabels(parameters);
      if (node.level == 0 && re && re.length) {
        this.handleNodeClick(re[0]);
      }
      if (re && re.length) {
        resolve(re);
      } else {
        resolve([]);
      }
    },
    async handleNodeClick(node) {
      let parameters = {
        parentTagId: node.value,
        startIndex: 1,
        pageSize: 1000,
      };
      const params = { tagId: node.value };
      this.currentLabel = await queryRuleDetails(params);
      this.isLoading = true;
      const start = new Date().getTime();
      let re = await getLabels(parameters);
      const end = new Date().getTime();
      if (end - start < 1000) {
        setTimeout(() => {
          this.isLoading = false;
        }, end - start);
      } else {
        this.isLoading = false;
      }
      this.tableData = [...re];
    },
    /**
     * @description: 列表选中回调
     * @param {*} list：选中的标签
     * @return {*}
     */
    handleTableSelect(list) {
      this.selectedLabels = [];
      list &&
        list.map((item) => {
          this.selectedLabels.push(item.id);
        });
    },
    /**
     * @description:列表详情点击回调函数
     * @param {*} data:列表每列的数据
     * @return {*}
     */
    handleTableItemClick(data) {
      data.id && this.getRuleDetails(data.id);
    },
    /**
     * @description:根据id获取规则详情
     * @param {*} id:标签ID
     * @return {*}
     */
    async getRuleDetails(id) {
      const params = { tagId: id };
      this.details = await queryRuleDetails(params);
      this.dialogVisible = true;
    },
    /**
     * @description: 一键删除回调
     * @param {*}
     * @return {*}
     */
    deleteMultiple() {
      console.log(123);
    },
  },
};
</script>

<style lang="scss" scoped>
.label-manage {
  height: calc(100% - 90px);
  // border: 1px solid blue;
  .content-box {
    background: none !important;
    padding: 0 !important;
    display: flex;
    justify-content: space-between;
    height: 100%;
    .nav {
      width: 240px;
      background: #ffffff;
      border-radius: 4.7px;
      padding: 20px 10px;
      box-sizing: border-box;
      min-height: 400px;
      .input-with-select {
        margin-bottom: 16px;
      }
      .custom-tree-node {
        padding: 12px 0;
        i {
          margin: 0 10px 0 0;
          color: #4b9fff;
        }
        .label-name {
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
        }
      }
    }
    .label-content {
      background: #ffffff;
      border-radius: 2px;
      width: calc(100% - 260px);
      padding: 20px 30px;
      box-sizing: border-box;
      text-align: left;
      height: 100%;
      overflow: auto;
      .title {
        display: flex;
        letter-spacing: 0;
        color: #333333;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 10px;
        flex-wrap: wrap;
        .name {
          font-size: 20px;
          font-weight: bold;
        }
        .number {
          color: #999999;
          font-weight: bold;
          margin: 0 9px;
        }
        .user-number {
          margin-right: 10px;
          max-width: 200px;
          display: inline-block;
          text-overflow: ellipsis;
          color: #999;
        }
      }
      .actions {
        padding: 10px 0;
        box-shadow: inset 0 -2px 0 0 #437ce6;
      }
    }
  }
}
</style>
<style lang="scss">
.label-tree .el-tree-node:focus > .el-tree-node__content {
  background: #4391f7;
  border-radius: 2px;
  .label-name {
    color: white !important;
  }
}
.label-tree .el-tree-node:focus .custom-tree-node i {
  color: white !important;
}
.label-tree.el-tree {
  height: calc(100% - 34px);
  overflow-y: scroll;
}
</style>
