<!--
 * @Author: your name
 * @Date: 2021-05-19 16:38:49
 * @LastEditTime: 2021-06-15 10:05:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentResourceManage\AllResource.vue
-->

<template>
  <div class="all-resource">
    <Statisticas title="全部资源" :list="staticstics"></Statisticas>
    <ResourceTable module-type="all" @update="updateData"></ResourceTable>
  </div>
</template>

<script>
// import Crumb from "@/components/Crumb.vue";
import ResourceTable from "@/views/contentResourceManage/ResourceTable.vue";
import Statisticas from "@/views/contentResourceManage/Statisticas.vue";
import { getStatistics } from "@/http/modules/contentResourceManage";
export default {
  name: "AllResource",
  data() {
    return {
      staticstics: [
        { title: "累计总数", value: 0 },
        { title: "已采纳数", value: 0 },
        // { title: "昨日上新数", value: 0 },
      ],
    };
  },
  components: {
    ResourceTable,
    Statisticas,
  },
  mounted() {
    this.updateData();
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo ? this.$store.getters.userInfo : null;
    },
    orgId() {
      return this.$store.getters.userInfo &&
        this.$store.getters.userInfo.organization &&
        this.$store.getters.userInfo.organization.id
        ? this.$store.getters.userInfo.organization.id
        : null;
    },
  },
  watch: {
    orgId(cur) {
      if (cur) {
        this.updateData();
      }
    },
  },
  methods: {
    async updateData() {
      let re = await getStatistics({ staticsType: "1", orgId: this.userInfo.organization.id });
      this.staticstics[0].value = re.ALL.totalCount || 0;
      this.staticstics[1].value = re.ALL.acceptCount || 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.all-resource {
  width: 100%;
  display: flex;
  flex-direction: column;
  .statistics {
    width: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 18px;
    height: 180px;
  }
}
</style>
