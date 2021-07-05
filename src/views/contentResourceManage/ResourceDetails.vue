<!--
 * @Author: your name
 * @Date: 2021-05-21 11:16:48
 * @LastEditTime: 2021-07-01 18:12:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\contentResourceManage\ResourceDetails.vue
-->
<template>
  <div>
    <el-dialog title="详情" :close-on-click-modal="false" width="900px" class="resource-details" v-bind="$attrs" append-to-body destroy-on-close @close="closeDialog">
      <div class="content">
        <el-row>
          <el-col :span="4" @click.native="openVideo()">
            <el-image :src="details.photoUrl" fit="fill" class="title-image" v-if="details.resourceType == '课程' && details.sourceType == '建行大学'"></el-image>
          </el-col>
          <el-col :span="20">
            <el-row class="title-row">
              <span class="name">{{ details.title }}</span>
              <!-- <el-divider direction="vertical"></el-divider>
              <span class="url">{{ details.url }}</span> -->
            </el-row>
            <el-row class="title-row">
              <span class="id">编号: {{ details.id }}</span>
              <el-divider direction="vertical"></el-divider>
              <span class="source">来源: {{ details.resourceType }}</span>
              <el-divider direction="vertical"></el-divider>
              <span class="type">类型: {{ details.sourceType }}</span>
              <el-divider direction="vertical"></el-divider>
              <span class="status">状态: {{ details.status }}</span>
              <el-divider direction="vertical" v-if="details.createTime"></el-divider>
              <span class="date" v-if="details.createTime">入库时间: {{ details.createTime }}</span>
            </el-row>
            <el-row class="title-row">
              <span class="duration" v-if="details.previewLength">时长: {{ details.previewLength }}</span>
              <el-divider direction="vertical" v-if="details.previewLength"></el-divider>
              <span class="size" v-if="details.fileSize">大小: {{ details.fileSize }}</span>
              <el-divider direction="vertical" v-if="details.fileSize"></el-divider>
              <span class="click-number" v-if="details.viewCount">点击: {{ details.viewCount }}</span>
              <el-divider direction="vertical" v-if="details.viewCount"></el-divider>
              <span class="comment" v-if="details.commentCount">评论: {{ details.commentCount }}</span>
              <el-divider direction="vertical" v-if="details.commentCount"></el-divider>
              <span class="collect" v-if="details.favoriteCount">收藏: {{ details.favoriteCount }}</span>
              <el-divider direction="vertical" v-if="details.favoriteCount && details.shareCount"></el-divider>
              <span class="forword" v-if="details.shareCount">转发: {{ details.shareCount }}</span>
            </el-row>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-col :span="details.busType ? 8 : 12">
            <el-row class="title-row"><span class="title">标题</span></el-row>
            <el-row>
              <span class="value">{{ details.title }}</span>
            </el-row>
          </el-col>
          <el-col :span="8" v-if="details.busType">
            <el-row class="title-row"><span class="title">分类</span></el-row>
            <el-row>
              <span class="value">{{ details.busType }}</span>
            </el-row>
          </el-col>
          <el-col :span="details.busType ? 8 : 12">
            <el-row class="title-row"><span class="title">有效期至</span></el-row>
            <el-row>
              <span class="value">{{ details.validityDate }}</span>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="title-row" v-if="details.TAG_GROUP && details.TAG_GROUP.length"><span class="title">标签</span></el-row>
        <el-row class="row" v-if="details.TAG_GROUP && details.TAG_GROUP.length">
          <el-tag type="info" v-for="(item, index) in details.TAG_GROUP" :key="index" size="small">{{ item.tagName }}</el-tag>
        </el-row>
        <el-row class="title-row">
          <el-col :span="12" v-if="details.keyWord"><span class="title">关键词</span></el-col>
          <el-col :span="12"><span class="title">推荐评级</span></el-col>
        </el-row>
        <el-row class="row" >
          <el-col :span="12" v-if="details.keyWord"
            ><span class="value">{{ details.keyWord }}</span></el-col
          >
          <el-col :span="12"><el-rate v-model="details.starLevel" disabled></el-rate></el-col>
        </el-row>
        <el-row class="title-row" v-if="details.summary"><span class="title">描述</span></el-row>
        <el-row class="row" v-if="details.summary">
          <span class="value">{{ details.summary }}</span>
        </el-row>
        <el-row class="title-row" v-if="details.photoUrl"><span class="title">封面</span></el-row>
        <el-row v-if="details.photoUrl">
          <el-image :src="details.photoUrl" fit="contain" class="front-cover"></el-image>
        </el-row>
        <el-divider></el-divider>
        <el-row class="title-row" v-if="details.content"><span class="title">资源内容</span></el-row>
        <el-row class="row" v-if="details.content">
          <div class="ql-container ql-snow">
            <div class="ql-editor resource-content" v-html="details.content"></div>
          </div>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ResourceDetails",
  props: {
    details: {
      type: Object,
      default() {
        return {
          photoUrl: "",
          title: "",
          url: "",
          id: "",
          resourceType: "",
          sourceType: "",
          status: "",
          createTime: "",
          duration: "",
          previewLength: "",
          viewCount: "",
          commentCount: "",
          favoriteCount: "",
          shareCount: "",
          busType: "",
          validityDate: "",
          labels: [],
          keyWord: "",
          summary: "",
          starLevel: 0,
          content: "",
          TAG_GROUP: [],
        };
      },
    },
  },
  components: {},
  data() {
    return {
      vedioUrl: "https://u.ccb.com/course/#/detail/",
    };
  },
  mounted() {
    console.log(this.details);
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    openVideo() {
      if (this.details.photoUrl && this.details.resourceType == "课程" && this.details.sourceType == "建行大学" && this.details.orginId) {
        let vedioSrc = this.vedioUrl + this.details.orginId;
        window.open(vedioSrc);
      } else {
        this.$message.warning("获取视屏资源失败");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.resource-details {
  text-align: left;
  .content {
    background: #f7f7f7;
    border-radius: 4px;
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
    .title-image,
    .front-cover {
      width: 120px;
      height: 67px;
    }
    .row {
      margin-bottom: 18px;
    }
    .title-row {
      margin-bottom: 8px;
    }
    .name {
      font-size: 16px;
      color: #222222;
      letter-spacing: 0;
      font-weight: bold;
    }
    .url {
      font-size: 14px;
      color: #4a90e2;
      letter-spacing: 0;
      line-height: 20px;
    }
    .id,
    .source,
    .type,
    .status,
    .date {
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .duration,
    .size,
    .click-number,
    .comment,
    .collect,
    .forword {
      font-size: 12px;
      color: #7b7f7e;
      letter-spacing: 0;
    }
  }
}
</style>
<style lang="scss">
.resource-details .el-dialog__header {
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
}
.resource-details .el-tag + .el-tag {
  margin-left: 10px;
}
.resource-details .ql-container.ql-snow {
  border: none !important;
}
.resource-details .resource-content {
  padding: 0 !important;
}
</style>
