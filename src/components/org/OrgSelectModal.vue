<template>
  <div class="org-select-modal">
    <el-dialog title="请选择" v-if="show" :visible.sync="show" :before-close.sync="onClose" :close-on-click-modal="false" width="60%" top="5vh" append-to-body>
      <el-container>
        <el-main class="org-main">
          <div class="selected">
            <p v-if="orgs && orgs.length > 0">已选择</p>
            <el-row>
              <el-col>
                <el-tag v-for="tag in orgs" :key="tag.id" closable @close="deleteOrg(tag)" :type="tag.name" size="mini">
                  {{ shortName(tag.name || tag.dept.name) }}
                  <!-- <template v-if="ifExtends">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-checkbox v-model="tag.extendsOrg" title="是否包含下辖机构">是否继承</el-checkbox>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </template> -->
                </el-tag>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8" v-if="trigger">
              <root-tree :allSource="allSource" @change="reloadSelectRoot" @changeOnce="reloadSelectRoot" :defaultRootId="defaultRootId"></root-tree>
            </el-col>
            <el-col :span="16" v-if="selectRoot">
              <div class="title" :title="selectRoot.name">{{ selectRoot.name }}</div>
              <div style="margin-bottom: 10px">
                <el-input v-model.trim="searchText" maxlength="50" show-word-limit @input="inputChange" placeholder="搜索机构" @change="search(searchText)" size="mini"> </el-input>
              </div>
              <org-tree
                :root="selectRoot"
                v-show="!searchText"
                :multiple="multiple"
                :check-strictly="checkStrictly"
                @change="update"
                :max-height="'280px'"
                :selectedOrgs="orgs.map((el) => el.id)"
                :filter-root="filterRoot"
                :filter-org="filterOrg"
                :unfold-level="unfoldLevel"
              ></org-tree>
              <div class="org-list" v-show="searchText">
                <el-table v-if="multiple" ref="orgTable" :data="candidates.data" height="330" border style="width: 100%" @select="addOrg" @select-all="addOrg">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="dept.id" label="机构号"></el-table-column>
                  <el-table-column prop="dept.name" label="机构名称"></el-table-column>
                </el-table>
                <el-table v-if="!multiple" ref="orgTable" :data="candidates.data" height="330" border style="width: 100%" @current-change="addOrgSingle">
                  <el-table-column type="index" label="序号" width="50"></el-table-column>
                  <el-table-column prop="dept.id" label="机构号"></el-table-column>
                  <el-table-column prop="dept.name" label="机构名称"></el-table-column>
                </el-table>
                <div class="pagination" v-if="candidates.total > candidates.limit">
                  <span class="demonstration">共{{ candidates.total }}条</span>
                  <el-pagination @current-change="handleCurrentChange" :page-size="candidates.limit" layout="prev, pager, next" :total="candidates.total"></el-pagination>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="mini">关 闭</el-button>
        <el-button type="primary" @click="save" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { OrgManageService } from "@/http/modules/OrgManageService";
import { OrgService } from "@/utils/OrgService";
import OrgTree from "./OrgTree";
import RootTree from "./RootTreeTemp";
export default {
  name: "org-select-modal",
  data() {
    return {
      multiple: true,
      allSource: false,
      trigger: false, //主动触发allSource
      selectOrg: false,
      ifExtends: false,
      submit: false,
      searchText: "",
      orgs: [],
      treeData: [],
      candidates: {
        pageCount: 0,
        currentPage: 0,
        offset: 0,
        limit: 10,
        data: [],
      },
      show: false,
      onClose: () => {
        console.log(123);
      },
      selectRoot: null,
      defaultRootId: "",
    };
  },
  props: {
    //机构树是否联动，true：不联动，false：联动
    checkStrictly: {
      type: Boolean,
      default: true,
    },
    //要过滤的机构树ID
    filterRoot: {
      type: String,
      default: "",
    },
    //过滤的机构列表,数组里面是机构id,
    filterOrg: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //机构树展开的层级数，最小值为1
    unfoldLevel: {
      type: Number,
      default: 1000,
    },
    //选择机构数量上限
    max: {
      type: Number,
      default: 10,
    },
  },
  components: { OrgTree, RootTree },
  computed: {
    orgLen() {
      return this.orgs.length;
    },
  },
  watch: {
    filterRoot(cur) {
      if (cur) {
        this.defaultRootId = cur;
      }
    },
    orgLen(cur) {
      if (cur > this.max) {
        this.$message.warning(`最多只能选择${this.max}个机构`);
        this.orgs = this.orgs.slice(0, 10);
      }
    },
  },
  methods: {
    shortName(name) {
      if (!name) {
        return "";
      }
      return OrgService.shorterName(name, "");
    },
    inputChange(val) {
      this.searchText = ("" + val).trim();
    },
    reloadSelectRoot(data) {
      this.selectRoot = data;
    },
    handleCurrentChange(page) {
      this.search(this.searchText, (page - 1) * this.candidates.limit);
    },
    openDialog(selectUser, config = { allSource: false, defaultRootId: "" }, selected = []) {
      // 所有人员
      if (selectUser === true) {
        return this.$refs.userSelect.openDialog(selected, config.allSource, config.defaultRootId).then((d) => {
          return Promise.resolve({
            users: d.map((d) => {
              if (!d) {
                return;
              }
              d.orgId = d.org.id;
              d.orgName = d.org.name;
              return d;
            }),
          });
        });
      }
      if (config.defaultRootId) {
        this.defaultRootId = config.defaultRootId;
      }
      console.log(selected);
      //回显
      if (selected.length) {
        this.orgs = selected.map((el) => el);
      } else {
        this.orgs = [];
      }
      this.show = true;
      if (config.multiple === false) {
        this.multiple = false;
      } else if (config.multiple === true) {
        this.multiple = true;
      }

      if (config.allSource === false) {
        //所有机构来源,默认只展示机构员工的数据来源
        this.allSource = false;
      } else if (config.allSource === true) {
        this.allSource = true;
      }
      if (config.ifExtends === false) {
        //所有机构来源,默认只展示机构员工的数据来源
        this.ifExtends = false;
      } else if (config.ifExtends === true) {
        this.ifExtends = true;
      }
      this.trigger = true;

      return new Promise((resolve, reject) => {
        this.onClose = () => {
          this.show = false;
          this.selectRoot = null;
          if (this.submit) {
            console.log(this.orgs);
            resolve({
              orgs: this.orgs,
            });
          } else {
            reject();
          }
        };
      });
    },
    //机构表
    search(text, offset = 0) {
      OrgManageService.callCommon("commonListOrganizationPaginated", {
        offset: offset,
        limit: this.candidates.limit,
        rootId: this.selectRoot.id,
        deptName: text,
      }).then((d) => {
        d.data &&
          d.data.data &&
          d.data.data.length > 0 &&
          d.data.data.forEach((el) => {
            el.id = el.dept.id;
            el.name = el.dept.name;
          });
        this.candidates.data = d.data.data.map((el) => {
          el.extendsOrg = false;
          return el;
        });
        this.candidates.total = d.data.totalCount;
        this.candidates.pageCount = d.data.pageCount;
        this.candidates.currentPage = d.data.currentPage;
        //已选回显
        this.$nextTick(() => {
          this.getSelectedOrgs();
        });
      });
    },
    //已选回显
    getSelectedOrgs() {
      if (this.orgs.length) {
        let ids = this.orgs.map((d) => d.id),
          select = this.candidates.data.filter((d) => ids.indexOf(d.id) != -1);
        select.forEach((el) => {
          this.$refs.orgTable.toggleRowSelection(el, true);
        });
      } else {
        this.$refs.orgTable.clearSelection();
      }
    },
    //机构树
    update(l) {
      if (this.multiple) {
        let ids = l.map((d) => d.id);
        let deleted = this.treeData.map((d) => d.id).filter((d) => ids.indexOf(d.id) === -1);
        this.orgs = this.orgs.filter((d) => deleted.indexOf(d.id) === -1);
        this.addOrg(l);
        this.treeData = l;
      } else {
        this.orgs.splice(0, this.orgs.length);
        this.addOrg(l);
      }
    },
    // merge() {
    //   this.addOrg(l);
    // },
    save() {
      this.submit = true;
      this.onClose();
    },
    closeDialog() {
      this.onClose();
    },
    deleteOrg(d) {
      this.orgs = this.orgs.filter((u) => u.id !== d.id);
    },
    addOrg(d, r) {
      let ids = d.map((d) => d.id);
      this.orgs = this.orgs.filter((u) => ids.indexOf(u.id) === -1 && (!r || u.id !== r.id));
      this.orgs = this.orgs.concat(d);
    },
    addOrgSingle(d) {
      if (d) {
        this.orgs.splice(0, this.orgs.length);
        this.orgs.push(d);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.org-main {
  padding: 0 20px;
  .title {
    margin-bottom: 10px;
  }
}
.org-select-modal {
  & .selected {
    margin-bottom: 10px;
  }

  & .title {
    padding: 9px 24px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #222222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-tree-node.is-current > .el-tree-node__content {
    background: #eeeeee;
  }

  .el-tree-node__content {
    padding: 9px 0;
    border-radius: 2px;
    border-radius: 2px;
    height: auto;
  }

  .el-table__body-wrapper::-webkit-scrollbar {
    background: #ffffff;
    width: 4px;
    height: 4px;
  }

  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #efefef;
    width: 4px;
    border-radius: 2px;
  }
}
</style>
<style lang="scss">
.org-main .el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
