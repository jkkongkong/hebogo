<!--
 * @Author: your name
 * @Date: 2021-05-19 16:38:49
 * @LastEditTime: 2021-06-15 14:11:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentResourceManage\AllResource.vue
-->

<template>
  <div class="my-collection">
    <Statisticas title="我的收藏" :list="staticstics"></Statisticas>
    <ResourceTable module-type="collect" @update="updateData"></ResourceTable>
  </div>
</template>

<script>
import ResourceTable from "@/views/contentResourceManage/ResourceTable.vue";
import Statisticas from "@/views/contentResourceManage/Statisticas.vue";
import { getStatistics } from "@/http/modules/contentResourceManage";
export default {
  name: "MyCollection",
  props: {},
  data() {
    return {
      staticstics: [
        { title: "累计收藏", value: 0 },
        { title: "建行大学", value: 0 },
        // { title: "远程中心", value: 0 },
        // { title: "分行创建", value: 0 },
        { title: "运营创建", value: 0 },
      ],
    };
  },
  components: {
    ResourceTable,
    Statisticas,
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  mounted() {
    this.updateData();
  },
  watch: {},
  methods: {
    async updateData() {
      let re = await getStatistics({ staticsType: "2", orgId: this.userInfo.organization.id });
      if (re && re.ORG && re.ORG.SOURCE) {
        this.staticstics[0].value = re.ORG.totalCount || 0;
        this.staticstics[1].value = re.ORG.SOURCE[2] || 0;
        this.staticstics[2].value = re.ORG.SOURCE[1] || 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-collection {
  width: 100%;
  display: flex;
  flex-direction: column;
  .item {
    width: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 4px;
  }
  .statistics {
    height: 180px;
  }
  .filter {
    margin: 18px 0;
    height: 167px;
  }
  .tabel {
    height: 500px;
  }
}
</style>
