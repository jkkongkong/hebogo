<template>
  <div id="DataService">
    <div id="content">
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%">
        <!-- 弹窗内套用的自定义表格 -->
        <el-form ref="ListForm" :model="ListForm" :rules="dialogRules" label-width="120px" :validate-on-rule-change="false">
          <!-- :disabled="dateDisable" -->
          <el-form-item label="目标用户编号" prop="userId">
            <el-input v-model="ListForm.userId"></el-input>
          </el-form-item>
          <el-form-item label="规则名称" prop="name">
            <el-input v-model="ListForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资源属性" prop="resources">
            <el-button size="mini" @click="pushResources">新增</el-button>
            <div class="resource">
              <div class="resourceContain" v-for="(item, key) in ListForm.resources" :key="key">
                <div class="resoureList">
                  <span>资源编号</span>
                  <el-input v-model="item.resId"></el-input>
                </div>
                <div class="resoureList">
                  <span>资源来源</span>
                  <el-select ref="DelegationTypeList" v-model="item.resSource">
                    <el-option v-for="item in resTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div class="resoureList">
                  <span>资源类型</span>
                  <el-select ref="DelegationTypeList" v-model="item.resType">
                    <el-option v-for="item in resSourceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </div>
                <el-button size="mini" @click="deleResources(key)">删除</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="confirmItem">
            <el-button type="primary" @click="confirm">确 认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <div class="default-layout">
        <div class="container">
          <div class="header delegateHead">
            <h1><i></i>运营数据</h1>
            <div class="toolbar">
              <el-button size="mini" @click="addData">新增数据</el-button>
            </div>
          </div>
          <div class="content-box" style="minheight: 0px">
            <el-table class="delegateTable" style="width: 100%" ref="userTable" :data="tableData" highlight-current-row max-height="600px">
              <el-table-column prop="userId" label="目标用户编号" width="120px"> </el-table-column>
              <el-table-column prop="name" label="规则名称" width="120px"></el-table-column>
              <el-table-column prop="resources" label="资源属性">
                <template slot-scope="scope">
                  <div v-for="(item, key) in scope.row.resources" :key="key">
                    <el-tag style="margin-bottom: 10px"
                      ><span style="margin-right: 10px">资源编号：{{ item.resId }}</span
                      ><span style="margin-right: 10px">资源来源：{{ transSource(item.resSource) }}</span> 资源类型：{{ transType(item.resType) }}</el-tag
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120px">
                <template slot-scope="scope" center>
                  <el-button @click.native.prevent="editData(scope.row)" type="text" size="small"> 修改 </el-button>
                  <el-button @click.native.prevent="delData(scope.row)" type="text" size="small" style="margin-left: 0px"> 删除 </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 20px"
              @size-change="handleSizeChange"
              @current-change="pagechange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="defaultPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { common } from "@/http/modules/common";
export default {
  name: "DataService",
  data() {
    return {
      dialogTitle: "新增数据",
      totalCount: 0,
      dialogVisible: false, //默认弹窗隐藏
      defaultPageSize: 10, //默认一次拉10条数据
      defaultstartIndex: 1,
      currentPage: 1,
      ListForm: {},
      //表单校验规则，只是检查下填没填而已
      dialogRules: {
        userId: [{ required: true, message: "请填写目标用户编号", trigger: "blur" }],
        name: [{ required: true, message: "请填写规则名称", trigger: "blur" }],
        resources: [{ required: true, message: "请填写至少一条资源属性", trigger: "blur" }],
      },
      resSourceList: [
        {
          name: "课程",
          id: "1",
        },
        {
          name: "微课",
          id: "2",
        },
        {
          name: "电子书",
          id: "3",
        },
        {
          name: "新闻资讯",
          id: "4",
        },
      ],
      resTypeList: [
        {
          name: "运营创建",
          id: "1",
        },
        {
          name: "建行大学",
          id: "2",
        },
        {
          name: "远程中心",
          id: "3",
        },
        {
          name: "营运中心",
          id: "4",
        },
      ],
      tableData: [],
      dialogForm: {},
      pageCount: null,
      isAdd: true,
    };
  },
  created() {
    this.reqData();
  },
  computed: {
    transSource() {
      return function (res) {
        switch (res) {
          case "1":
            return "课程";
          case "2":
            return "微课";
          case "3":
            return "电子书";
          case "4":
            return "新闻资讯";
        }
      };
    },
    transType() {
      return function (res) {
        switch (res) {
          case "1":
            return "运营创建";
          case "2":
            return "建行大学";
          case "3":
            return "远程中心";
          case "4":
            return "营运中心";
        }
      };
    },
  },
  methods: {
    addData() {
      this.dialogTitle = "新增数据";
      this.dialogVisible = true;
      this.ListForm = {
        userId: "",
        name: "",
        resources: [{ resId: "", resSource: "", resType: "" }],
      };
    },
    pushResources() {
      this.ListForm.resources.push({ resId: "", resSource: "", resType: "" });
    },
    deleResources(key) {
      this.ListForm.resources.splice(key, 1);
    },
    async addoreditor() {
      let funcCode = "";
      if (this.dialogTitle == "新增数据") {
        funcCode = "addPushRuleForce";
      } else {
        funcCode = "updatePushRuleForce";
      }
      const re = await common(funcCode, this.ListForm);
      if (re && re.result == "SUCCESS") {
        if (this.dialogTitle == "新增数据") {
          this.$message.success("添加成功");
          this.dialogVisible = false;
          //请求数据列表
          this.reqData();
        } else {
          this.$message.success("修改成功");
          this.dialogVisible = false;
          //请求数据列表
          this.reqData();
        }
      } else {
        if (re && re.message) this.$message.error(re.message);
      }
    },
    async confirm() {
      this.$refs.ListForm.validate((valid) => {
        if (valid) {
          this.addoreditor();
        }
      });
    },
    async reqData() {
      let funcCode = "getPushRuleForce";
      let params = {
        startIndex: this.defaultstartIndex,
        pageSize: this.defaultPageSize,
      };
      console.log(params);
      const re = await common(funcCode, params);
      if (re && re.result == "SUCCESS") {
        console.log(re);
        this.tableData = re.data.data;
        this.totalCount = re.data.totalSize;
      } else {
        if (re && re.message) this.$message.error(re.message);
      }
    },
    editData(row) {
      // 编辑数据
      this.dialogTitle = "修改数据";
      this.dialogVisible = true;
      this.ListForm = JSON.parse(JSON.stringify(row));
    },
    async delData(row) {
      const re = await common("deletePushRuleForceById", { forcePushId: row.forcePushId });
      if (re && re.result == "SUCCESS") {
        this.$message.success("删除数据成功");
        //请求数据列表
        this.reqData();
      } else {
        if (re && re.message) this.$message.error(re.message);
      }
    },
    handleSizeChange(res) {
      this.defaultPageSize = res;
      //请求数据列表
      this.reqData();
    },
    pagechange(val) {
      this.currentPage = val;
      let dataCount = this.defaultPageSize;
      this.defaultstartIndex = (this.currentPage - 1) * dataCount + 1;
      //请求数据列表
      this.reqData();
    },
  },
};
</script>

<style lang="scss">
#DataService {
  padding: 20px;
  .confirmItem {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .resource {
    max-height: 300px;
    overflow-y: scroll;
  }
  .resourceContain {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .el-button {
      width: 60px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      border-radius: 12px;
    }
  }
  .resoureList {
    width: 30%;
    display: flex;
    flex-direction: column;
    .el-input {
      width: 140px;
      line-height: 38px;
      height: 38px;
      input {
        width: 100%;
        line-height: 38px;
        height: 38px;
      }
    }
    span {
      font-size: 12px;
      display: inline-block;
      margin-right: 10px;
    }
  }
}
#DataService .el-main {
  background-color: white;
}
#DataService .el-row {
  margin-bottom: 30px;
}
#DataService .el-col {
  border-radius: 4px;
}

#DataService .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
#DataService .row-bg {
  padding: 20px 0;
  background-color: #f9fafc;
}
.DataService {
  margin-top: 20px;
}

.cancelCurrent {
  margin-top: 20px;
}

#DataService .toolbar {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: flex-end;
}
#DataService .content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0px;
  .serch-box {
    width: 100%;
    padding: 0 0.2px 0.2px 0.2px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .el-input {
      width: 2px;
      height: 0.4px;
      margin-right: 0.2px;
    }
    .el-date-editor {
      width: 3px;
      height: 0.4px;
      margin-right: 0.2px;
    }
  }
  .el-table {
    &::before {
      background-color: transparent;
    }
    th {
      background: #e9ecf2;
      font-family: PingFangSC-Medium;
      font-size: 0.14px;
      color: #3d4251;
      text-align: center;
    }
    td {
      font-family: PingFangSC-Medium;
      font-size: 0.14px;
      color: #666666;
      text-align: center;
      &:nth-child(1) {
        color: #333333;
      }
      &:nth-child(2) {
        color: #333333;
      }
      button {
        color: #108fff;
      }
    }
  }
}
</style>
