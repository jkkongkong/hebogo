<template>
  <div class="resource-manage" v-loading.fullscreen="isLoading">
    <div class="content-box">
      <div class="rule-head">
        <span class="title">规则列表</span>
        <el-button size="mini" @click="createResource" round icon="el-icon-plus">新建规则</el-button>
      </div>
      <div class="actions">
        <el-input placeholder="规则名称/编号" v-model.trim="keyWord" class="input-with-select item" size="mini" :maxlength="30" @keyup.enter.native="searchResource">
          <el-button slot="append" icon="el-icon-search" @click="searchResource"></el-button>
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
              (type) => {
                changeSelectLabe(type, typeOptions, '规则类型');
              }
            "
          >
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-tooltip>
        <el-date-picker v-model="date" size="mini" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <el-button type="primary" size="mini" class="query-btn item" @click="searchResource">查询</el-button>
        <el-button size="mini" @click="batchDelete">一键删除</el-button>
      </div>

      <el-table :data="tableData" ref="rulesTable" @select="handleTableSelect" @select-all="handleTableSelect" current-row-key="pushRuleId" row-key="pushRuleId" style="width: 100%">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="id" show-overflow-tooltip label="编号"> </el-table-column>
        <el-table-column prop="name" show-overflow-tooltip label="名称"> </el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ statusMaps[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ typeMaps[scope.row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="简介" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.createDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sellCount" show-overflow-tooltip label="数量">
          <template slot-scope="scope">
            <span>{{ scope.row.sellCount > 0 ? scope.row.sellCount : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="resourceUrl" show-overflow-tooltip label="链接"> </el-table-column>
        <el-table-column prop="unzipPassword" show-overflow-tooltip label="解压密码"> </el-table-column>
        <el-table-column prop="keyWord" show-overflow-tooltip label="关键词"> </el-table-column>
        <el-table-column width="130px" label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="light" :open-delay="500" content="查看详情" placement="top">
              <i class="action-item el-icon-zoom-in" @click="queryResourceDetails(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" content="编辑" placement="top">
              <i class="action-item el-icon-edit" @click="editResource(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" content="删除" placement="top">
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
    <Details :visible.sync="resourceDetailsVisible" v-if="resourceDetailsVisible" :content="currentResource"></Details>
    <Publish :visible.sync="dialogVisiblePublish" v-if="dialogVisiblePublish" :content="currentResource" :operateType="operateType"></Publish>
  </div>
</template>

<script>
import { queryResourceList, patchDeleteResource } from "@/http/modules/resourceManage.js";
import Details from "@/views/resourceManage/Details.vue";
import Publish from "@/views/resourceManage/Publish";
import { formatDate, formatDate1 } from "@/utils/format.js";
export default {
  name: "ResourceManage",
  props: {},
  data() {
    return {
      resourceDetailsVisible: false,
      statusOptions: [
        { label: "资源状态", value: null },
        { label: "草稿", value: "0" },
        { label: "已发布", value: "1" },
        { label: "推荐", value: "2" },
      ],
      typeOptions: [
        { label: "资源类型", value: null },
        { label: "视频", value: "0" },
        { label: "电子书", value: "1" },
        { label: "自建资源", value: "2" },
        { label: "微课", value: "3" },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      statusMaps: { 0: "草稿", 1: "已发布", 2: "推荐" },
      typeMaps: { 0: "视频", 1: "电子书", 2: "自建资源", 3: "微课" },
      keyWord: null,
      resourceType: null,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      status: null,
      type: null,
      rule_plate: null,
      currentResource: null,
      isLoading: false,
      selectedResources: [],
      operateType: "0",
      date: null,
      dialogVisiblePublish: false,
    };
  },
  components: {
    Details,
    Publish,
  },
  created() {
    console.log(123);
  },
  mounted() {
    this.searchResource();
  },
  computed: {
    isInFrame() {
      return this.$store.getters.isInFrame;
    },
  },
  watch: {
    keyWord(cur, pre) {
      if (!cur && pre != null) {
        this.searchResource();
      }
    },
    dialogVisiblePublish(cur) {
      if (!cur) {
        this.searchResource();
      }
    },
  },
  methods: {
    formatDate: formatDate,
    test() {},
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
      this.searchResource();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.searchResource();
    },
    async searchResource() {
      console.log(this.date);
      if (this.date && this.date.length) {
        this.date[0] = formatDate1(this.date[0]);
        this.date[1] = formatDate1(this.date[1]);
      }
      let re = await queryResourceList({ keyWord: this.keyWord, status: this.status, type: this.type, pageNum: this.currentPage, pageSize: this.pageSize, date: this.date });
      this.tableData = re.list && re.list.length ? [...re.list] : [];
      this.total = re.total;
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
    editResource(resource) {
      this.currentResource = resource;
      this.operateType = "1";
      this.dialogVisiblePublish = true;
    },
    createResource() {
      this.operateType = "0";
      this.currentResource = null;
      this.dialogVisiblePublish = true;
    },
    queryResourceDetails(resource) {
      this.currentResource = resource;
      this.resourceDetailsVisible = true;
    },
    async deleteResource(node) {
      let re = await patchDeleteResource([node.id]);
      if (re) {
        this.$message.success("删除成功");
        this.searchResource();
      } else {
        this.$message.error("删除失败");
      }
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
        let ids = [];
        this.selectedResources.map((item) => {
          ids.push(item.id);
        });
        let re = await patchDeleteResource(ids);
        if (re) {
          this.$message.success("删除成功");
          this.searchResource();
        } else {
          this.$message.error("删除失败");
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
        console.log(123);
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
.resource-manage {
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
.resource-manage {
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
