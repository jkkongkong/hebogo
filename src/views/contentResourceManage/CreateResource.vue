<!--
 * @Author: your name
 * @Date: 2021-05-19 17:02:47
 * @LastEditTime: 2021-06-23 16:16:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentResourceManage\CreateResource.vue
-->

<template>
  <div class="create-resource">
    <el-tabs v-model="activeName">
      <el-tab-pane label="新建资源" name="create"></el-tab-pane>
      <el-tab-pane :label="'全部(' + staticstics.selfAll + ')'" name="selfAll" :disabled="!staticstics.selfAll"></el-tab-pane>
      <el-tab-pane :label="'已发布(' + staticstics.selfDistributed + ')'" name="selfDistributed" :disabled="!staticstics.selfDistributed"></el-tab-pane>
      <!-- <el-tab-pane
        :label="'未通过(' + staticstics.selfFailed + ')'"
        name="selfFailed"
        :disabled="!staticstics.selfFailed"
      ></el-tab-pane> -->
      <el-tab-pane :label="'草稿箱(' + staticstics.selfDraft + ')'" name="selfDraft" :disabled="!staticstics.selfDraft"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <TextEditor v-show="activeName == 'create'"></TextEditor>
      <ResourceTable v-show="activeName != 'create'" :module-type="activeName" @update="getStatistics"></ResourceTable>
    </div>
  </div>
</template>

<script>
import ResourceTable from "@/views/contentResourceManage/ResourceTable.vue";
import TextEditor from "@/views/contentResourceManage/TextEditor.vue";
import { getStatistics } from "@/http/modules/contentResourceManage";
export default {
  name: "CreateResource",
  data() {
    return {
      activeName: "create",
      staticstics: {
        selfAll: 1,
        selfDistributed: 1,
        selfFailed: 1,
        selfDraft: 1,
      },
    };
  },
  components: {
    ResourceTable,
    TextEditor,
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  watch: {},
  mounted() {
    this.getStatistics();
  },
  methods: {
    async getStatistics() {
      let re = await getStatistics({ staticsType: "3", orgId: this.userInfo.organization.id });
      if (re && re.SELF && re.SELF.STATUS) {
        this.staticstics.selfDraft = re.SELF.STATUS[1] || 0;
        this.staticstics.selfFailed = re.SELF.STATUS[3] || 0;
        this.staticstics.selfDistributed = re.SELF.STATUS[4] || 0;
        this.staticstics.selfAll = re.SELF.totalCount;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-resource {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 4px;
  .content {
    height: calc(100% - 60px);
  }
}
</style>
<style lang="scss">
.create-resource {
  & .el-tabs__nav-scroll {
    padding: 0 22px !important;
    background: #fff !important;
  }
}
</style>
