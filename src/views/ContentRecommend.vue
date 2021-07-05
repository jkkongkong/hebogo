<!--
 * @Author: your name
 * @Date: 2021-05-19 14:47:25
 * @LastEditTime: 2021-07-02 15:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\ContentRecommend.vue
-->

<template>
  <div class="content-recommend" v-loading.fullscreen="isLoading">
    <div class="content-box">
      <div class="rule-head">
        <span class="title">规则列表</span>
        <el-button size="mini" @click="createRule" round icon="el-icon-plus">新建规则</el-button>
      </div>
      <div class="actions">
        <el-input placeholder="规则名称/编号" v-model.trim="keyWord" class="input-with-select item" size="mini" :maxlength="30" @keyup.enter.native="searchRules">
          <el-button slot="append" icon="el-icon-search" @click="searchRules"></el-button>
        </el-input>
        <el-tooltip effect="light" :open-delay="500" content="规则状态" placement="top">
          <el-select
            v-model="status"
            size="mini"
            class="item"
            @visible-change="
              (status) => {
                changeSelectLabe(status, statusOptions, '规则状态');
              }
            "
          >
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-tooltip>
        <el-tooltip effect="light" :open-delay="500" content="规则类型" placement="top">
          <el-select
            v-model="type"
            size="mini"
            class="item"
            @visible-change="
              (status) => {
                changeSelectLabe(status, typeOptions, '规则类型');
              }
            "
          >
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-tooltip>
        <!-- <el-tooltip effect="light" :open-delay="500" content="所属板块" placement="top">
          <el-select
            v-model="rule_plate"
            size="mini"
            class="item"
            @visible-change="
              (status) => {
                changeSelectLabe(status, plateOptions, '所属板块');
              }
            "
          >
            <el-option v-for="item in plateOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-tooltip> -->
        <el-button type="primary" size="mini" class="query-btn item" @click="searchRules">查询</el-button>
        <!-- <el-button size="mini" @click="batchExport">一键导出</el-button> -->
        <el-button size="mini" @click="batchChangeStatus(1)">一键启用</el-button>
        <el-button size="mini" @click="batchChangeStatus(0)">一键停用</el-button>
        <el-button size="mini" @click="batchDelete">一键删除</el-button>
      </div>

      <el-table :data="tableData" ref="rulesTable" @select="handleTableSelect" @select-all="handleTableSelect" current-row-key="pushRuleId" row-key="pushRuleId" style="width: 100%">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="pushRuleId" show-overflow-tooltip label="规则编号"> </el-table-column>
        <el-table-column prop="name" show-overflow-tooltip label="规则名称"> </el-table-column>
        <el-table-column prop="status" label="规则状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ ruleStatus[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="规则内容" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="pushCnt" show-overflow-tooltip label="推送次数">
          <template slot-scope="scope">
            <span>{{ scope.row.pushCnt > 0 ? scope.row.pushCnt : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="collectNum" show-overflow-tooltip label="收藏量">
          <template slot-scope="scope">
            <span>{{ scope.row.collectNum > 0 ? scope.row.collectNum : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="forwardNum" show-overflow-tooltip label="转发量">
          <template slot-scope="scope">
            <span>{{ scope.row.forwardNum > 0 ? scope.row.forwardNum : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commentNum" show-overflow-tooltip label="评论量">
          <template slot-scope="scope">
            <span>{{ scope.row.commentNum > 0 ? scope.row.commentNum : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="130px" label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="light" :open-delay="500" content="查看详情" placement="top">
              <i class="action-item el-icon-zoom-in" @click="queryRuleDetails(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" :content="scope.row.status == '1' || scope.row.status == '3' ? '停用' : '启用'" placement="top">
              <i
                :class="scope.row.status == '1' || scope.row.status == '3' ? 'action-item el-icon-video-pause' : 'action-item el-icon-video-play'"
                @click="changeStatus(scope.row, scope.row.status == '1' || scope.row.status == '3' ? '0' : '1')"
              ></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" content="编辑" placement="top" v-show="scope.row.status == '0' || scope.row.status == '3'">
              <i class="action-item el-icon-edit" @click="editRule(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" content="删除" placement="top" v-show="scope.row.status == '0' || scope.row.status == '3'">
              <i class="action-item el-icon-delete" @click="deleteResource(scope.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 40, 80]"
        :page-size="pageSize"
        :layout="isInFrame ? 'total, prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
        small
        :total="total"
      >
      </el-pagination>
    </div>
    <EditRules :visible.sync="editRuleVisible" :id="currentRuleId" v-if="editRuleVisible" @change="searchRules"></EditRules>
    <RuleDetails :visible.sync="ruleDetailsVisible" :id="currentRuleId" v-if="ruleDetailsVisible"></RuleDetails>
  </div>
</template>

<script>
import EditRules from "@/views/contentRecommend/EditRules";
import RuleDetails from "@/views/contentRecommend/RuleDetails";
import { changeSelectLabe } from "@/utils/conmponentFuncs";
import { ruleStatus } from "@/utils/constant";
import { getPushRuleList, deletePushRuleById, pushRuleSwitcher } from "@/http/modules/contentRecommend";
export default {
  name: "content-recommend",
  props: {},
  data() {
    return {
      editRuleVisible: false,
      ruleDetailsVisible: false,
      typeOptions: [
        { label: "规则类型", value: null },
        { label: "资源规则", value: "0" },
        { label: "场景规则", value: "1" },
      ],
      statusOptions: [
        { label: "规则状态", value: null },
        { label: "停用", value: "0" },
        { label: "启用", value: "1" },
        { label: "待停用", value: "2" },
        { label: "待启用", value: "3" },
      ],
      plateOptions: [
        { label: "所属板块", value: null },
        { label: "课程", value: "1" },
        { label: "微课", value: "2" },
        { label: "电子书", value: "3" },
        { label: "新闻资讯", value: "4" },
      ],
      keyWord: null,
      resourceType: null,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 1000,
      status: null,
      type: null,
      rule_plate: null,
      ruleStatus: ruleStatus,
      currentRuleId: null,
      isLoading: false,
      selectedResources: [],
    };
  },
  components: {
    EditRules,
    RuleDetails,
  },
  created() {
    console.log(123);
  },
  mounted() {
    this.searchRules();
  },
  computed: {
    isInFrame() {
      return this.$store.getters.isInFrame;
    },
  },
  watch: {
    keyWord(cur, pre) {
      if (!cur && pre != null) {
        this.searchRules();
      }
    },
  },
  methods: {
    changeSelectLabe: changeSelectLabe,
    test() {
      this.editRuleVisible = true;
    },
    handleTableSelect(list) {
      this.selectedResources = [];
      list &&
        list.map((item) => {
          this.tableData.map((tItem) => {
            if (item.pushRuleId == tItem.pushRuleId) {
              this.selectedResources.push(item);
            }
          });
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.searchRules();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.searchRules();
    },
    async searchRules() {
      let params = {
        searchKey: this.keyWord || null,
        status: this.status,
        type: this.type,
        pageSize: this.pageSize,
        startIndex: this.pageSize * (this.currentPage - 1) + 1,
      };
      this.tableData = [];
      this.selectedResources = [];
      this.isLoading = true;
      const start = new Date().getTime();
      try {
        let re = await getPushRuleList(params);
        this.total = re.totalSize;
        if (re && re.data && re.data.length) {
          this.tableData = [...re.data];
          //因为存在这个bug（http://128.160.171.19/zentao/bug-view-9944.html）去掉回显，每次读取列表都把selectedResources置空
          // this.$nextTick(() => {
          //   this.echoTableList();
          // });
        } else if (this.currentPage > 1) {
          //如果currentPage不是1，那么回退一页显示
          this.currentPage = this.currentPage - 1;
          this.searchRules();
        }
        const end = new Date().getTime();
        if (end - start < 1000) {
          setTimeout(() => {
            this.isLoading = false;
          }, end - start);
        } else {
          this.isLoading = false;
        }
      } catch (e) {
        this.isLoading = false;
      }
    },
    /**
     * @description: 回显列表数据
     * @param {*}
     * @return {*}
     */
    echoTableList() {
      if (this.selectedResources.length && this.tableData.length) {
        this.selectedResources.map((item) => {
          this.tableData.map((tItem) => {
            if (item.pushRuleId == tItem.pushRuleId) {
              this.$refs.rulesTable.toggleRowSelection(tItem, true);
            }
          });
        });
      }
    },
    selectHandler(status, list) {
      console.log(status);
      console.log(list);
      if (status) {
        this.typeOptions[0].label = "全部";
      } else {
        this.typeOptions[0].label = "规则类型";
      }
    },
    /**
     * @description: 编辑退则
     * @param {*} rule：规则对象
     * @return {*}
     */
    editRule(rule) {
      this.currentRuleId = rule.pushRuleId;
      this.editRuleVisible = true;
    },
    createRule() {
      this.currentRuleId = null;
      this.editRuleVisible = true;
    },
    queryRuleDetails(rule) {
      this.currentRuleId = rule.pushRuleId;
      this.ruleDetailsVisible = true;
    },
    deleteResource(node) {
      this.$confirm("是否确认删除该规则?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let params = {
          pushRuleIdList: [node.pushRuleId],
        };
        let re = await deletePushRuleById(params);
        if (re) {
          this.searchRules();
        }
      });
    },
    /**
     * @description: 批量删除
     * @param {*}
     * @return {*}
     */
    batchDelete() {
      this.selectedResources = this.$refs.rulesTable.selection;
      if (!this.selectedResources || !this.selectedResources.length) {
        this.$message.warning("请至少选择一个规则!");
        return;
      }
      this.$confirm("是否确认删除选中规则?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let params = {
          pushRuleIdList: [],
        };
        this.selectedResources.map((item) => {
          params.pushRuleIdList.push(item.pushRuleId);
        });
        let re = await deletePushRuleById(params);
        if (re) {
          this.searchRules();
        }
      });
    },
    /**
     * @description: 启动或者停用 规则
     * @param {*} status:0：启用，1：停用
     * @return {*}
     */
    changeStatus(node, status) {
      this.$confirm(`是否确认${status == "0" ? "停用" : "启用"}规则?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let params = {
          ruleList: [node.pushRuleId],
          status: status,
        };
        let re = await pushRuleSwitcher(params);
        if (re) {
          this.searchRules();
        }
      });
    },
    /**
     * @description:批量启动或者停用 规则
     * @param {*} status：0：启用，1：停用
     * @return {*}
     */
    batchChangeStatus(status) {
      this.selectedResources = this.$refs.rulesTable.selection;
      if (!this.selectedResources || !this.selectedResources.length) {
        this.$message.warning("请至少选择一个规则!");
        return;
      }
      this.$confirm(`是否确认${status == "0" ? "停用" : "启用"}选中规则?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let params = {
          ruleList: [],
          status: status,
        };
        this.selectedResources.map((item) => {
          params.ruleList.push(item.pushRuleId);
        });
        let re = await pushRuleSwitcher(params);
        if (re) {
          this.searchRules();
        }
      });
    },
    /**
     * @description: 一键导出
     * @param {*}
     * @return {*}
     */
    batchExport() {
      console.log(123);
    },
  },
};
</script>

<style lang="scss" scoped>
.content-recommend {
  height: calc(100% - 90px);
  overflow: hidden;
  .content-box {
    padding: 20px 30px;
    background: white;
    height: calc(100% - 40px);
    overflow-y: auto;
    .rule-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        /**
         * @description:
         * @param {*}
         * @return {*}
         */
        color: #333333;
        letter-spacing: 0;

        display: block;
        font-weight: bold;
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      box-shadow: inset 0 -2px 0 0 #437ce6;
      .query-btn {
        margin-right: 10px;
      }
      .input-with-select {
        max-width: 200px;
        min-width: 50px;
      }
      .item + .item {
        margin-left: 10px;
      }
    }
    .action-item {
      color: #2877ff;
      cursor: pointer;
      font-size: 18px;
      margin-left: 5px;
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.content-recommend {
  .input-with-select {
    width: 255px;
    .el-input-group__append {
      background: #66b1ff;
      padding: 0 10px;
      .el-icon-search {
        color: white;
      }
    }
  }
  .el-button--default {
    color: #66b1ff;
  }
}
</style>
