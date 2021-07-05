<!--
 * @Author: wuxi
 * @Date: 2021-05-21 09:51:51
 * @LastEditTime: 2021-06-17 15:05:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\contentResourceManage\Statisticas.vue
-->
<template>
  <div class="statistics">
    <span class="title">{{ title }}</span>
    <div class="content">
      <div class="item" v-for="(item, index) in list" :key="index" :style="{ width: itemWidth }">
        <span class="item-title"><i class="el-icon-s-data"></i>{{ item.title }}</span>
        <span class="item-value">
          <countTo :startVal="startVal" :endVal="item.value" :duration="2000"></countTo>
          <span class="measure">条</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import countTo from "vue-count-to";
export default Vue.extend({
  name: "Statistics",
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { countTo },
  data() {
    return { startVal: 0 };
  },
  computed: {
    itemWidth() {
      return this.list.length ? 100 / this.list.length + "%" : "0";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.statistics {
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  margin-bottom: 18px;
  height: 180px;
  display: flex;
  flex-direction: column;
  text-align: left;
  .title {
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    font-weight: bold;
  }
  .content {
    width: 100%;
    height: calc(100% - 16px);
    display: flex;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .item-title {
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        text-align: left;
        i {
          margin-right: 10px;
        }
      }
      .item-value {
        font-size: 36px;
        color: #222222;
        letter-spacing: 0;
        text-align: center;
        font-weight: bold;
        position: relative;
        .measure {
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          position: absolute;
          bottom: 0;
          right: -20px;
        }
      }
    }
  }
}
</style>
