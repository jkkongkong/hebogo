<template>
  <div class="content-recommend-params">
    <el-row class="row-item">
      <el-col :span="2" class="title">资源搜索 </el-col>
      <el-col :span="6">
        <el-input placeholder="资源名称/编号" v-model.trim="params.keyWord" class="input-with-select" size="mini" :maxlength="30" @keyup.enter.native="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div class="advance-filter" v-show="(moduleType == 'all' || moduleType == 'collect') && advanceSearch">
        <!----------------------------------------- 资源类型，来源类型，资源状态，资源级别，资源标签 ---------------------------------------->
        <el-row class="row-item" :gutter="10">
          <el-col :span="2" class="title">条件过滤 </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="资源类型" placement="top">
              <el-select
                v-model="params.resourceType"
                placeholder="资源类型"
                size="mini"
                class="param-item"
                @visible-change="
                  (status) => {
                    changeSelectLabe(status, typeOptions, '资源类型');
                  }
                "
              >
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="资源来源" placement="top">
              <el-select
                v-model="params.sourceType"
                placeholder="资源来源"
                class="param-item"
                size="mini"
                @visible-change="
                  (status) => {
                    changeSelectLabe(status, sourceOptions, '资源来源');
                  }
                "
              >
                <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="资源状态" placement="top">
              <el-select
                v-model="params.status"
                placeholder="资源状态"
                size="mini"
                class="param-item"
                @visible-change="
                  (status) => {
                    changeSelectLabe(status, statusOptions, '资源状态');
                  }
                "
              >
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="浏览量" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="behaviorStatistics(2)">{{ "浏览量" + (params.viewCountStart ? " >" + params.viewCountStart + "次" : "") }}</el-button>
            </el-tooltip>
            <!-- <el-tooltip effect="light" :open-delay="500" content="资源级别" placement="top">
              <el-select
                v-model="params.resourceLevel"
                placeholder="资源级别"
                size="mini"
                class="param-item"
                @visible-change="
                  (status) => {
                    changeSelectLabe(status, levelOptions, '资源级别');
                  }
                "
              >
                <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-tooltip> -->
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="标签" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="labelVisible = true">{{ "标签" + (params.tagIdList.length ? "(" + params.tagIdList.length + ")" : "") }}</el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <!----------------------------------------- 编制机构，编制时间，收藏时间，学习时长，资源评分 ---------------------------------------->
        <el-row class="row-item" :gutter="10">
          <el-col :span="2"> </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="编制机构" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="selectOrg">{{ orgs && orgs.length ? "编制机构" + "(" + orgs.length + ")" : "编制机构" }} </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="学习时长" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="behaviorStatistics(1)">{{ duration && duration.length ? duration[0] + "min~" + duration[1] + "min" : "学习时长" }}</el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="资源评分" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="behaviorStatistics(6)">{{ score && score.length ? score[0] + "分~" + score[1] + "分" : "资源评分" }}</el-button>
              <!-- <el-select
                v-model="params.totalCommentScore"
                placeholder="资源评分"
                class="param-item"
                size="mini"
                @visible-change="
                  (status) => {
                    changeSelectLabe(status, gradeOptions, '资源评分');
                  }
                "
              >
                <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select> -->
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="编制时间" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="selectEditDate">
                {{ editTime && editTime.length ? formatTime2(editTime[0]) + "-" + formatTime2(editTime[1]) : "编制时间" }}
                <el-date-picker
                  class="date-picker"
                  v-model="editTime"
                  @change="editTimeChange"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  ref="editDatePicker"
                >
                </el-date-picker>
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="收藏时间" placement="top" v-show="moduleType == 'collect'">
              <el-button size="mini" plain class="plain-btn param-item" @click="selectCollectDate">
                {{ collectTime && collectTime.length ? formatTime2(collectTime[0]) + "-" + formatTime2(collectTime[1]) : "收藏时间" }}
                <el-date-picker
                  class="date-picker"
                  v-model="collectTime"
                  @change="collectTimeChange"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  ref="collectDatePicker"
                >
                </el-date-picker>
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <!----------------------------------------- 编码，浏览量，点赞量，收藏量，分享数 ---------------------------------------->
        <!-- <el-row class="row-item" :gutter="10">
          <el-col :span="2"> </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="浏览量" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="behaviorStatistics(2)">{{ "浏览量" + (params.viewCountStart ? " >" + params.viewCountStart + "次" : "") }}</el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="点赞量" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="behaviorStatistics(3)">{{ "点赞量" + (params.praiseCountStart ? " >" + params.praiseCountStart + "次" : "") }}</el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="收藏量" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="behaviorStatistics(4)">{{ "收藏量" + (params.favoriteCountStart ? " >" + params.favoriteCountStart + "次" : "") }}</el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="分享数" placement="top">
              <el-button size="mini" plain class="plain-btn param-item" @click="behaviorStatistics(5)">{{ "分享数" + (params.shareCountStart ? " >" + params.shareCountStart + "次" : "") }}</el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip effect="light" :open-delay="500" content="视频编码" placement="top">
              <el-select
                v-model="params.code"
                placeholder="视频编码"
                class="param-item"
                size="mini"
                @visible-change="
                  (status) => {
                    changeSelectLabe(status, codeOptions, '视频编码');
                  }
                "
              >
                <el-option v-for="item in codeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-tooltip>
          </el-col>
        </el-row> -->
        <!----------------------------------------- 关键词复合检索 ---------------------------------------->
        <el-row class="row-item" :gutter="10">
          <el-col :span="2" class="title">复合检索 </el-col>
          <el-col :span="4">
            <span class="title">标题: </span>
            <el-input size="mini" v-model.trim="params.compositeIndexTitle" class="complex-input"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="params.compositeIndexOperatorFirst" size="mini" class="param-item">
              <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <span class="title">简介: </span>
            <el-input size="mini" v-model.trim="params.compositeIndexSummary" class="complex-input"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="params.compositeIndexOperatorSecond" size="mini" class="param-item">
              <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <span class="title">全文: </span>
            <el-input size="mini" v-model.trim="params.compositeIndexContent" class="complex-input"></el-input>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <div class="row-item bottom" v-show="moduleType == 'all' || moduleType == 'collect'">
      <div class="btn">
        <el-button type="primary" size="mini" v-show="advanceSearch" @click="search" ref="test">查询</el-button>
        <el-button size="mini" v-show="advanceSearch" @click="resetParams">重置</el-button>
      </div>
      <el-button type="text" @click="advanceSearch = !advanceSearch">高级检索<i :class="advanceSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i></el-button>
    </div>
    <LabelSelect :visible.sync="labelVisible" @change="labelSelecChange" v-if="labelVisible" show-checkbox check-strictly :default-checked-keys="params.tagIdList"></LabelSelect>
    <RangeSelect :visible.sync="rangeVisible" :type="rangeType" @change="rangeSelectChange" v-if="rangeVisible" :start="rangeStart" :end="rangeEnd"></RangeSelect>
    <OrgSelectModal ref="orgSelectModal"></OrgSelectModal>
  </div>
</template>

<script>
import Vue from "vue";
import { changeSelectLabe } from "@/utils/conmponentFuncs";
import LabelSelect from "@/components/label/LabelSelect";
import { formatTime2 } from "@/utils/format";
import RangeSelect from "@/components/range/RangeSelect";
import OrgSelectModal from "@/components/org/OrgSelectModal";
export default Vue.extend({
  name: "ContentRecommendParams.",
  props: {
    moduleType: {
      type: String,
      //all:全部资源,collect:我的收藏,selfAll:自建资源所有，selfDistributed:已发布，selfFailed:未通过,selfDraft:草稿,只有在all和collect类型下 才显示高级搜索
      default: "all",
    },
  },
  components: { LabelSelect, RangeSelect, OrgSelectModal },
  data() {
    return {
      advanceSearch: false,
      rangeVisible: false,
      rangeType: 1, //1:学习时长，2：浏览量，3:点赞量，4：收藏量,5：分享量
      labelVisible: false,
      editTime: [],
      collectTime: [],
      duration: [],
      score: [],
      rangeStart: 0,
      rangeEnd: 0,
      orgs: [],
      params: {
        keyWord: null,
        resourceType: null,
        sourceType: null,
        status: null,
        resourceLevel: null,
        tagIdList: [],
        orgIdList: [],
        createTimeStart: null,
        createTimeEnd: null,
        studyHoursStart: null,
        studyHoursEnd: null,
        totalCommentScore: null,
        operateType: "1",
        viewCountStart: null,
        praiseCountStart: null,
        favoriteCountStart: null,
        shareCountStart: null,
        compositeIndexTitle: null,
        compositeIndexContent: null,
        compositeIndexSummary: null,
        compositeIndexOperatorFirst: null,
        compositeIndexOperatorSecond: null,
        averagEcommentscoreMax: null,
        averagEcommentscoreMin: null,
      },
      typeOptions: [
        { label: "资源类型", value: null },
        { label: "课程", value: "1" },
        { label: "微课", value: "2" },
        { label: "电子书", value: "3" },
        { label: "新闻资讯", value: "4" },
      ],
      sourceOptions: [
        { label: "来源类型", value: null },
        { label: "运营创建", value: "1" },
        { label: "建行大学", value: "2" },
        // { label: "远程中心", value: "3" },
        // { label: "运营中心", value: "4" },
      ],
      statusOptions: [
        { label: "资源状态", value: null },
        { label: "初始导入", value: "0" },
        { label: "草稿", value: "1" },
        { label: "待审核", value: "2" },
        { label: "审核失败", value: "3" },
        { label: "已发布", value: "4" },
      ],
      levelOptions: [
        { label: "资源级别", value: null },
        { label: "1级", value: "1" },
        { label: "2级", value: "2" },
        { label: "3级", value: "3" },
        { label: "4级", value: "4" },
        { label: "5级", value: "5" },
      ],
      codeOptions: [
        { label: "资源编码", value: null },
        { label: "1级", value: "1" },
        { label: "2级", value: "2" },
        { label: "3级", value: "3" },
        { label: "4级", value: "4" },
        { label: "5级", value: "5" },
      ],
      gradeOptions: [
        { label: "资源评分", value: null },
        { label: "1分", value: "1" },
        { label: "2分", value: "2" },
        { label: "3分", value: "3" },
        { label: "4分", value: "4" },
        { label: "5分", value: "5" },
      ],
      operatorOptions: [
        { label: "AND", value: "0" },
        { label: "OR", value: "1" },
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
    };
  },
  computed: {
    keyWords() {
      return this.params.keyWord;
    },
  },
  watch: {
    keyWords(cur, pre) {
      if (!cur && pre != null) {
        this.search();
      }
    },
  },
  methods: {
    changeSelectLabe: changeSelectLabe,
    /**
     * @description: 格式化时间：YY/MM/DD
     * @param {*}
     * @return {*}
     */
    formatTime2: formatTime2,
    resetParams() {
      this.params = {
        keyWord: null,
        resourceType: null,
        sourceType: null,
        status: null,
        resourceLevel: null,
        tagIdList: [],
        orgIdList: [],
        createTimeStart: null,
        createTimeEnd: null,
        studyHoursStart: null,
        studyHoursEnd: null,
        totalCommentScore: null,
        operateType: "1",
        viewCountStart: null,
        praiseCountStart: null,
        favoriteCountStart: null,
        shareCountStart: null,
        compositeIndexTitle: null,
        compositeIndexContent: null,
        compositeIndexSummary: null,
        compositeIndexOperatorFirst: null,
        compositeIndexOperatorSecond: null,
        averagEcommentscoreMax: null,
        averagEcommentscoreMin: null,
      };
      this.editTime = [];
      this.collectTime = [];
      this.duration = [];
      this.score = [];
      this.rangeStart = 0;
      this.rangeEnd = 0;
      this.orgs = [];
    },
    search() {
      this.params.operateType = "1";
      //如果是空则赋值为null
      this.params.keyWord = this.params.keyWord || null;
      this.$emit("change", this.params);
    },
    /**
     * @description: 添加标签回调函数
     * @param {*}
     * @return {*}
     */
    labelSelecChange(labels) {
      this.labelVisible = false;
      this.params.tagIdList = [];
      labels.map((item) => {
        this.params.tagIdList.push(item.value);
      });
    },
    /**
     * @description: 选择编制时间
     * @param {*}
     * @return {*}
     */
    selectEditDate() {
      this.$refs.editDatePicker.$emit("click");
    },
    editTimeChange(value) {
      this.params.createTimeStart = value[0];
      this.params.createTimeEnd = value[1];
    },
    collectTimeChange(value) {
      this.params.favoriteTimeStart = value[0];
      this.params.favoriteTimeEnd = value[1];
    },
    /**
     * @description: 选择收藏时间
     * @param {*}
     * @return {*}
     */
    selectCollectDate() {
      this.$refs.collectDatePicker.$emit("click");
    },
    /**
     * @description: 范围选择响应函数
     * @param {*}
     * @return {*}
     */
    rangeSelectChange(val) {
      switch (this.rangeType) {
        //学习时长
        case 1:
          this.duration = [...val];
          this.params.studyHoursStart = val[0] || 0;
          this.params.studyHoursEnd = val[1] || 0;
          break;
        //浏览量
        case 2:
          this.params.viewCountStart = val[0];
          break;
        //点赞量
        case 3:
          this.params.praiseCountStart = val[0];
          break;
        //收藏量
        case 4:
          this.params.favoriteCountStart = val[0];
          break;
        //分享量
        case 5:
          this.params.shareCountStart = val[0];
          break;
        //资源评分
        case 6:
          this.score = [...val];
          this.params.averagEcommentscoreMin = val[0] || 0;
          this.params.averagEcommentscoreMax = val[1] || 0;
          break;
      }
    },

    /**
     * @description: 用户行为统计
     * @param {*} type：1:学习时长,2：浏览量，3:点赞量，4：收藏量,5：分享量
     * @return {*}
     */
    behaviorStatistics(type) {
      this.rangeType = type;
      switch (this.rangeType) {
        //学习时长
        case 1:
          this.rangeStart = this.duration[0];
          this.rangeEnd = this.duration[1];
          break;
        //浏览量
        case 2:
          this.rangeStart = this.params.viewCountStart;
          this.rangeEnd = 0;
          break;
        //点赞量
        case 3:
          this.rangeStart = this.params.praiseCountStart;
          this.rangeEnd = 0;
          break;
        //收藏量
        case 4:
          this.rangeStart = this.params.favoriteCountStart;
          this.rangeEnd = 0;
          break;
        //分享量
        case 5:
          this.rangeStart = this.params.shareCountStart;
          this.rangeEnd = 0;
          break;
        //资源评分
        case 6:
          this.rangeStart = this.params.averagEcommentscoreMin;
          this.rangeEnd = this.params.averagEcommentscoreMax;
          break;
      }
      this.rangeVisible = true;
    },
    /**
     * @description: 选择机构
     * @param {*}
     * @return {*}
     */
    selectOrg() {
      this.$refs.orgSelectModal
        .openDialog(
          false,
          {
            allSource: true,
            multiple: true,
            ifExtends: true,
          },
          this.orgs.length ? this.orgs : []
        )
        .then((d) => {
          let orgs = d.orgs;
          this.params.orgIdList = [];
          if (orgs.length) {
            this.orgs = [...d.orgs];
            this.orgs.map((item) => {
              this.params.orgIdList.push(item.id);
            });
          } else {
            this.orgs = [];
          }
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-recommend-params {
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .row-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &.bottom {
      justify-content: center;
      position: relative;
      width: 100%;
      margin-top: 18px;
      min-height: 28px;
      .btn {
        position: absolute;
        left: 0;
      }
    }
    .title {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #222222;
      letter-spacing: 0;
      flex-shrink: 0;
    }
    .selects {
      display: flex;
      flex-wrap: nowrap;
    }
    .plain-btn {
      color: rgb(96, 98, 102);
      text-align: left;
      overflow: hidden;
      position: relative;
      &:hover,
      &:focus,
      &:active {
        border-color: #c0c4cc !important;
      }
    }
  }
  .date-picker {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    overflow: hidden;
  }
  .complex-input {
    width: calc(100% - 37px);
  }
  .param-item {
    width: 100%;
  }
}
</style>
<style lang="scss">
.content-recommend-params {
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
