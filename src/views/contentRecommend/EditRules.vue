<!--
 * @Author: your name
 * @Date: 2021-05-19 15:06:57
 * @LastEditTime: 2021-07-02 11:22:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\contentRecommend\EditRules.vue
-->
<template>
  <div>
    <el-dialog :title="id ? '编辑规则' : '新建规则'" :close-on-click-modal="false" width="900px" append-to-body class="edit-rules" v-bind="$attrs" @close="closeDialog">
      <div class="content">
        <el-form :model="rules" label-position="top" :rules="rulesOption" ref="ruleForm">
          <el-row>
            <el-col class="item">
              <el-form-item label="标题" prop="name">
                <el-input v-model.trim="rules.name" placeholder="请输入标题" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="item">
              <el-form-item label="内容" prop="description">
                <el-input v-model.trim="rules.description" placeholder="请输入内容" size="mini" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="用户群" prop="userTagList">
                <div class="labels">
                  <div class="label-item" v-for="(item, index) in rules.userTagList" :key="index">
                    <span>{{ item.label }}</span>
                    <el-tooltip effect="light" :open-delay="500" content="删除" placement="top">
                      <i class="el-icon-remove-outline" @click="deleteLabel(index, 1)"></i>
                    </el-tooltip>
                    <el-tooltip effect="light" :open-delay="500" content="编辑" placement="top">
                      <i class="el-icon-edit" @click="editLabel(item, index, 1)"></i>
                    </el-tooltip>
                  </div>
                  <div class="add-btn" @click="addLabel(1)">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资源群" prop="resTagList">
                <div class="labels">
                  <div class="label-item" v-for="(item, index) in rules.resTagList" :key="index">
                    <span>{{ item.label }}</span>
                    <el-tooltip effect="light" :open-delay="500" content="删除" placement="top">
                      <i class="el-icon-remove-outline" @click="deleteLabel(index, 2)"></i>
                    </el-tooltip>
                    <el-tooltip effect="light" :open-delay="500" content="编辑" placement="top">
                      <i class="el-icon-edit" @click="editLabel(item, index, 2)"></i>
                    </el-tooltip>
                  </div>
                  <div class="add-btn" @click="addLabel(2)">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="save" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <LabelSelect :visible.sync="labelVisible" v-if="labelVisible" :show-checkbox="isAdd" check-strictly @change="labelSelecChange" :default-checked-keys="selectLabelKeys"></LabelSelect>
  </div>
</template>

<script>
import { queryRuleDetails, addPushRule, updatePushRule } from "@/http/modules/contentRecommend";
import LabelSelect from "@/components/label/LabelSelect";
const validateRuleUsers = (rule, value, callback) => {
  if (value && value.length) {
    callback();
  } else {
    callback(new Error("请选择用户群"));
  }
};
const validateRuleResources = (rule, value, callback) => {
  if (value && value.length) {
    callback();
  } else {
    callback(new Error("请选择资源群"));
  }
};
export default {
  name: "EditRules",
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    LabelSelect,
  },
  data() {
    return {
      rules: {
        name: null,
        description: null,
        userTagList: [],
        resTagList: [],
      },
      rulesOption: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        description: [{ required: true, message: "请输入内容", trigger: "blur" }],
        userTagList: [{ required: true, validator: validateRuleUsers, trigger: "blur" }],
        resTagList: [{ required: true, validator: validateRuleResources, trigger: "blur" }],
      },
      labelTrees: [],
      labelVisible: false,
      currentLabel: { label: "", value: "" },
      currentModel: 1,
      isAdd: false,
      selectLabelKeys: [],
      editIndex: 0, //用于记录编辑的是第几个标签
    };
  },
  watch: {
    async id(cur) {
      if (cur) {
        let temp = { pushRuleId: cur };
        let re = await queryRuleDetails(temp);
        if (re) {
          this.rules = re;
          this.rules.userTagList = [this.rules.userTagList];
          this.rules.userTagList &&
            this.rules.userTagList.forEach((item) => {
              item.label = item.name;
              item.value = item.id;
            });
          this.rules.resTagList = [this.rules.resTagList];
          this.rules.resTagList &&
            this.rules.resTagList.forEach((item) => {
              item.label = item.name;
              item.value = item.id;
            });
          console.log(this.rules);
        }
      }
    },
  },
  async mounted() {
    if (this.id) {
      let temp = { pushRuleId: this.id };
      let re = await queryRuleDetails(temp);
      if (re) {
        this.rules = re;
        this.rules.userTagList &&
          this.rules.userTagList.forEach((item) => {
            item.label = item.name;
            item.value = item.id;
          });
        this.rules.resTagList &&
          this.rules.resTagList.forEach((item) => {
            item.label = item.name;
            item.value = item.id;
          });
      }
      console.log(this.rules);
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    /**
     * @description: 添加标签
     * @param {*} model,1:用户组,2:资源组
     * @return {*}
     */
    addLabel(model) {
      this.currentModel = model;
      this.isAdd = true;
      this.selectLabelKeys = [];
      if (this.currentModel == 1) {
        this.rules.userTagList &&
          this.rules.userTagList.map((item) => {
            this.selectLabelKeys.push(item.value);
          });
      } else {
        this.rules.resTagList &&
          this.rules.resTagList.map((item) => {
            this.selectLabelKeys.push(item.value);
          });
      }
      this.labelVisible = true;
    },
    /**
     * @description: 标签选择change事件回调函数
     * @param {*}
     * @return {*}
     */
    labelSelecChange(labels) {
      if (this.currentModel == 1) {
        //用户组
        if (this.isAdd) {
          //添加
          labels.map((item) => {
            let re = this.checkRepeatLabel(item, this.rules.userTagList);
            if (!re) {
              this.rules.userTagList.push(item);
            }
          });
        } else {
          //编辑
          let re = this.checkRepeatLabel(labels[0], this.rules.userTagList);
          if (!re) {
            this.rules.userTagList.splice(this.editIndex, 1, labels[0]);
          }
        }
        this.$refs.ruleForm.validateField("userTagList");
      } else {
        //资源组
        if (this.isAdd) {
          //添加
          labels.map((item) => {
            let re = this.checkRepeatLabel(item, this.rules.resTagList);
            if (!re) {
              this.rules.resTagList.push(item);
            }
          });
        } else {
          //编辑
          let re = this.checkRepeatLabel(labels[0], this.rules.resTagList);
          if (!re) {
            this.rules.resTagList.splice(this.editIndex, 1, labels[0]);
          }
        }
        this.$refs.ruleForm.validateField("resTagList");
      }
    },
    /**
     * @description: 检测数组中是否已经存在标签
     * @param {*} label
     * @param {*} list
     * @return {*}
     */
    checkRepeatLabel(label, list) {
      let flag = false;
      if (label && list && list.length) {
        list.map((item) => {
          if (item && item.value == label.value) {
            flag = true;
          }
        });
      }
      return flag;
    },
    /**
     * @description: 标记标签
     * @param {*} label：标签对象
     * @param {*} index：标签索引
     * @param {*} model：模块，1：用户组，2：资源组
     * @return {*}
     */
    editLabel(label, index, model) {
      this.selectLabelKeys = [label.value];
      this.labelVisible = true;
      this.isAdd = false;
      this.editIndex = index;
      this.currentModel = model;
    },
    /**
     * @description: 删除标签
     * @param {*} index：索引
     * @param {*} model：模块，1：用户组，2：资源组
     * @return {*}
     */
    deleteLabel(index, model) {
      if (model == 1) {
        this.rules.userTagList.splice(index, 1);
      } else {
        this.rules.resTagList.splice(index, 1);
      }
    },
    save() {
      console.log(11);
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let re = false;
          let params = {
            name: this.rules.name,
            description: this.rules.description,
            userTagIdList: this.rules.userTagList.map((item) => {
              return item.value;
            }),
            resTagIdList: this.rules.resTagList.map((item) => {
              return item.value;
            }),
          };
          if (this.id) {
            params.pushRuleId = this.id;
            re = await updatePushRule(params);
          } else {
            re = await addPushRule(params);
          }
          if (re) {
            this.$emit("change");
            this.closeDialog();
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-rules {
  text-align: left;
  .content {
    background: #f7f7f7;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: left;
    padding: 22px 19px;
    max-height: 600px;
    overflow-y: auto;
    .labels {
      display: flex;
      flex-direction: column;
      .label-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(220, 223, 230);
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #222222;
          letter-spacing: 0;
        }
        i {
          color: #66b1ff;
          cursor: pointer;
          margin-right: 10px;
        }
        .el-icon-remove-outline {
          margin-left: auto;
        }
        &:hover {
          border-color: #c0c4cc;
        }
      }
      .add-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        margin-top: 10px;
        border: 1px dashed rgb(220, 223, 230);
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          border-color: #66b1ff;
          i {
            color: #66b1ff;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.edit-rules {
  @media screen and (max-width: 1200px) {
    .el-dialog {
      margin-top: 3vh !important;
    }
  }
}
.edit-rules .el-input__inner,
.edit-rules .el-textarea__inner {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  background-color: #f7f7f7 !important;
  border-radius: 0px !important;
}
.edit-rules {
  @media screen and (max-width: 1200px) {
    .el-dialog {
      margin-top: 3vh !important;
    }
  }
}
</style>
