<!--
 * @Author: your name
 * @Date: 2021-05-19 17:46:14
 * @LastEditTime: 2021-07-02 11:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentResourceManage\ResourceTable.vue
-->
<template>
  <div class="resource-table" v-loading.fullscreen="isLoading">
    <ParamsFilter class="filter" @change="paramsChange" :module-type="moduleType"></ParamsFilter>
    <div class="tabel item">
      <div class="actions">
        <el-button size="mini" @click="collectMultiple" :disabled="!selectedResources.length">
          {{ moduleType == "collect" ? "一键推荐" : "一键收藏" }}
        </el-button>
        <!-- <el-button size="mini" @click="deleteMultiple" :disabled="!selectedResources.length">一键删除</el-button> -->
      </div>
      <el-table :data="tableData" ref="contentResourceTable" @select="handleTableSelect" @select-all="handleTableSelect" current-row-key="id" row-key="id" style="width: 100%">
        <el-table-column type="selection" :selectable="selectFilter"> </el-table-column>
        <el-table-column prop="id" show-overflow-tooltip label="编号"> </el-table-column>
        <el-table-column prop="title" show-overflow-tooltip label="标题"> </el-table-column>
        <el-table-column prop="type" label="类型" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="source" label="来源" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="cstatus" label="状态" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="viewCount" show-overflow-tooltip label="浏览量">
          <template slot-scope="scope">
            <span>{{ scope.row.viewCount > 0 ? scope.row.viewCount : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" show-overflow-tooltip label="入库时间"> </el-table-column>
        <el-table-column width="130px" label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="light" :open-delay="500" :content="scope.row.favoriteStatus == '3' ? '取消推荐' : '推荐'" placement="top">
              <i :class="scope.row.favoriteStatus == '3' ? 'iconfont icon-tuijian2' : 'iconfont icon-tuijian2 recommend'" @click="updateStatus(scope.row, scope.row.favoriteStatus == '3' ? '4' : '3')" v-if="moduleType == 'collect'"></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" :content="scope.row.favoriteStatus == '1' || scope.row.favoriteStatus == '3' ? '取消收藏' : '收藏'" placement="top">
              <i
                :class="scope.row.favoriteStatus == '1' || scope.row.favoriteStatus == '3' ? 'el-icon-star-on' : 'el-icon-star-off'"
                @click="updateStatus(scope.row, scope.row.favoriteStatus == '1' || scope.row.favoriteStatus == '3' ? '2' : '1')"
                v-if="scope.row.status == 4"
              ></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" content="查看详情" placement="top">
              <i class="action-item el-icon-zoom-in" @click="queryResouceDetails(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" content="编辑" placement="top">
              <i class="action-item el-icon-edit" @click="editResouceDetails(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="light" :open-delay="500" content="删除" placement="top">
              <i class="action-item el-icon-delete" @click="deleteResource(scope.row)"></i>
            </el-tooltip>
            <!-- <el-button @click="queryResouceDetails(scope.row)" type="text" size="small" class="details">查看</el-button> -->
            <!-- <el-button
              @click="editResouceDetails(scope.row)"
              type="text"
              size="small"
              class="details"
              v-show="moduleType == 'selfDraft'"
              >编辑</el-button
            > -->
            <!-- <el-button type="text" size="small" class="edit">编辑</el-button> -->
            <!-- <el-button type="text" size="small" class="edit">编辑</el-button> -->
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
    <ResourceDetails :visible.sync="dialogVisible" :details="details" v-if="dialogVisible"></ResourceDetails>
    <EditResource :visible.sync="editVisible" v-if="editVisible"></EditResource>
    <Publish :visible.sync="dialogVisiblePublish" v-if="dialogVisiblePublish" :content="content" @success="publishHandler" :appendix="fileGroup" :operateType="operateType"></Publish>
  </div>
</template>

<script>
import ResourceDetails from "@/views/contentResourceManage/ResourceDetails.vue";
import EditResource from "@/views/contentResourceManage/EditResource.vue";
import Publish from "@/views/contentResourceManage/Publish";
import { getResourceDetails, queryResource, updateResourceStatus, editResource } from "@/http/modules/contentResourceManage";
import ParamsFilter from "@/components/advancedSearch/ContentRecommendParams";
import { replaceTextContent } from "@/utils/conmponentFuncs";
//recommend,tuijian2
export default {
  name: "ResourceTable",
  props: {
    moduleType: {
      type: String,
      //all:全部资源,collect:我的收藏,selfAll:自建资源所有，selfDistributed:已发布，selfFailed:未通过,selfDraft:草稿
      default: "all",
    },
  },
  data() {
    return {
      content: "",
      fileGroup: [],
      operateType: "5",
      params: null,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      isAccurate: true,
      selectedResources: [],
      isLoading: false,
      dialogVisible: false,
      editVisible: false,
      dialogVisiblePublish: false,
      details: {},
    };
  },
  components: { ResourceDetails, EditResource, ParamsFilter, Publish },
  mounted() {
    this.getResourceList();
  },
  computed: {
    orgId() {
      return this.$store.getters.userInfo && this.$store.getters.userInfo.organization && this.$store.getters.userInfo.organization.id ? this.$store.getters.userInfo.organization.id : null;
    },
    isInFrame() {
      return this.$store.getters.isInFrame;
    },
    isEditing() {
      return this.$store.getters.isEditing;
    },
  },
  watch: {
    moduleType() {
      this.pageSize = 10;
      this.currentPage = 1;
      this.params = null;
      this.getResourceList();
    },
    orgId(cur) {
      if (cur) {
        this.getResourceList();
      }
    },
    isEditing(cur) {
      if (!cur) {
        this.editVisible = false;
      }
    },
  },
  methods: {
    /**
     * @description: 过滤复选框，已经收藏的  不能选择
     * @param {*}
     * @return {*}
     */
    selectFilter(row) {
      if (this.moduleType == "collect") {
        return row.favoriteStatus != "3";
      } else {
        return row.favoriteStatus != "1" && row.favoriteStatus != "3" && row.status == "4";
      }
    },
    /**
     * @description: 编辑资源
     * @param {*} data
     * @return {*}
     */
    async editResouceDetails(data) {
      //视屏资源
      if (data.resourceType == "1" && data.sourceType == "2") {
        this.dialogVisiblePublish = true;
      } else {
        this.editVisible = true;
      }
      this.details = await getResourceDetails(data);
      if (this.details.content) {
        this.details.content = replaceTextContent(this.details.content, true);
      }
      if (this.details.photoUrl) {
        this.details.photoUrl = replaceTextContent(this.details.photoUrl, true);
      }
      this.$store.dispatch("contentResourceManage/setCurrentResource", this.details);
      this.$store.dispatch("contentResourceManage/setIsEditing", true);
    },
    /**
     * @description: 查询资源详情
     * @param {*} data：资源对象
     * @return {*}
     */
    async queryResouceDetails(data) {
      this.dialogVisible = true;
      this.details = await getResourceDetails(data);
      if (this.details.content) {
        this.details.content = replaceTextContent(this.details.content, true);
      }
      if (this.details.photoUrl) {
        this.details.photoUrl = replaceTextContent(this.details.photoUrl, true);
      }
    },
    /**
     * @description: 翻页每页条数发生变化响应函数
     * @param {*} size:每页条数
     * @return {*}
     */
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.getResourceList();
    },
    /**
     * @description: 当前页数发生变化响应函数
     * @param {*} page:当前页数
     * @return {*}
     */
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getResourceList();
    },
    /**
     * @description: 过滤面板参数变化
     * @param {*}
     * @return {*}
     */
    paramsChange(val) {
      this.pageSize = 10;
      this.currentPage = 1;
      //把选中的资源全部清空
      this.selectedResources = [];
      this.params = { ...val };
      this.getResourceList();
    },
    /**
     * @description: 读取资源列表
     * @param {*}
     * @return {*}
     */
    async getResourceList() {
      // this.moduleType
      //all:全部资源,collect:我的收藏,selfAll:自建资源所有，selfDistributed:已发布，selfFailed:未通过,selfDraft:草稿
      let params = {
        startIndex: this.pageSize * (this.currentPage - 1) + 1,
        pageSize: this.pageSize,
        orgId: this.orgId,
        favorite: null,
        ...this.params,
      };
      switch (this.moduleType) {
        case "collect":
          params.favorite = 1;
          break;
        case "selfAll":
          params.sourceType = 1;
          break;
        case "selfDistributed":
          params.sourceType = 1;
          params.status = 4;
          break;
        case "selfFailed":
          params.sourceType = 1;
          params.status = 3;
          break;
        case "selfDraft":
          params.sourceType = 1;
          params.status = 1;
          break;
      }
      this.tableData = [];
      this.selectedResources = [];
      this.isLoading = true;
      const start = new Date().getTime();
      try {
        let re = await queryResource(params);
        this.total = re.totalCount;
        if (re && re.data && re.data.length) {
          this.tableData = [...re.data];
          //因为存在这个bug（http://128.160.171.19/zentao/bug-view-9944.html）去掉回显，每次读取列表都把selectedResources置空
          // this.$nextTick(() => {
          //   this.echoTableList();
          // });
        } else if (this.currentPage > 1) {
          this.currentPage = this.currentPage - 1;
          this.getResourceList();
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
     * @description: 一键删除
     * @param {*}
     * @return {*}
     */
    deleteMultiple() {
      console.log(123);
    },
    /**
     * @description: 一键收藏
     * @param {*}
     * @return {*}
     */
    async collectMultiple() {
      this.selectedResources = this.$refs.contentResourceTable.selection;
      this.selectedResources = JSON.parse(JSON.stringify(this.selectedResources));
      this.selectedResources.forEach((item) => {
        item.createTime = new Date(item.createTime);
      });
      let params = {
        operateType: this.moduleType == "collect" ? "3" : "1",
        orgId: this.orgId,
        RESOURCE_GROUP: this.selectedResources,
      };
      await updateResourceStatus(params);
      this.selectedResources = [];
      this.getResourceList();
    },
    /**
     * @description: 过滤查询
     * @param {*}
     * @return {*}
     */
    filterSearch() {
      (this.isAccurate = false), (this.currentPage = 1);
      this.getResourceList();
    },
    /**
     * @description:列表选中回调函数
     * @param {*}
     * @return {*}
     */
    handleTableSelect(list) {
      this.selectedResources = [];
      list &&
        list.map((item) => {
          this.tableData.map((tItem) => {
            if (item.id == tItem.id) {
              this.selectedResources.push(item);
            }
          });
        });
    },
    /**
     * @description: 点击收藏状态按钮，改变资源收藏状态
     * @param {*} row，
     * @param {*} status：状态，2：表示取消收藏，1收藏
     * @return {*}
     */
    async updateStatus(row, status = "2") {
      if (row.status != "4") {
        //只有处于”已发布“的资源才能被收藏或者采纳
        this.$message.warning("只有处于”已发布“状态的资源才能被收藏或者采纳");
        return;
      }
      let item = Object.assign({}, row);
      item.createTime = new Date(item.createTime);
      let params = {
        operateType: status,
        orgId: this.orgId,
        RESOURCE_GROUP: [item],
      };
      await updateResourceStatus(params);
      this.getResourceList();
      this.$emit("update");
    },
    /**
     * @description:删除资源
     * @param {*} row
     * @return {*}
     */
    deleteResource(row) {
      this.$confirm("是否确认删除该信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let param = {
          id: row.id,
          operateType: "-1",
        };
        let re = await editResource(param);
        if (re == "SUCCESS") {
          this.getResourceList();
          this.$emit("update");
        }
      });
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
            if (item.id == tItem.id) {
              this.$refs.contentResourceTable.toggleRowSelection(tItem, true);
            }
          });
        });
      }
    },
    publishHandler() {
      this.getResourceList();
      this.$emit("update");
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  .item {
    width: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 4px;
  }
  .filter {
    margin-bottom: 18px;
  }
  .tabel {
    min-height: 200px;
    .iconfont,
    .el-icon-star-on,
    .el-icon-star-off {
      color: #2877ff;
      cursor: pointer;
    }
    .iconfont,
    .el-icon-star-on {
      font-size: 20px;
    }
    .el-icon-star-off {
      font-size: 18px;
    }
    .recommend {
      color: gray !important;
    }
    .actions {
      padding-bottom: 10px;
      box-shadow: inset 0 -2px 0 0 #437ce6;
    }
  }
  .edit,
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
</style>
