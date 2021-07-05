<template>
  <div class="org-tree-component">
    <div class="tree scroll-class" v-bind:style="{ 'max-height': maxHeight }">
      <el-input placeholder="请输入关键字进行过滤" v-model.trim="filterText" v-if="filterble"></el-input>
      <el-tree
        :props="{ label: 'shortName', isLeaf: 'leaf' }"
        :load="loadNode"
        node-key="id"
        :default-checked-keys="selectedOrgs"
        lazy
        ref="tree"
        :check-strictly="checkStrictly"
        :show-checkbox="multiple"
        :filter-node-method="filterNode"
        @node-click="treeNodeClick"
        @check-change="nodeChanged"
      >
        <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { OrgManageService } from "@/http/modules/OrgManageService";
import { OrgService } from "@/utils/OrgService";
export default {
  name: "org-tree",
  props: {
    maxHeight: {
      type: String,
      default: "600px",
    },
    orgSelected: {
      type: Function,
      default: () => {
        console.log(123);
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    selectedOrgs: {
      type: Array,
      default: () => [],
    },
    root: {
      //机构树ID
      type: Object,
      default: () => ({
        id: "",
        name: "",
        top: {
          id: "111111111", //默认机构员工的id
        },
      }),
    },
    //机构树是否联动，true：不联动，false：联动
    checkStrictly: {
      type: Boolean,
      default: true,
    },
    //用于标识是否可以通过关键字进行过滤
    filterble: {
      type: Boolean,
      default: false,
    },
    sortble: {
      type: Boolean,
      default: false,
    },
    //要过滤的机构树ID,用于指定某些机构的的树可以通过filterOrg来过滤
    filterRoot: {
      type: String,
      default: "",
    },
    //过滤的机构列表,数组里面是机构id,用于过滤某些机构(filterRoot)的子机构
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
    //第一层级是否可选
    doesSelectLevel1: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      lastSelected: undefined,
      save_node: null,
      save_resolve: null,
      onClose: () => {
        console.log(123);
      },
      filterText: "",
      orgTimer: null,
    };
  },
  methods: {
    filterNode(value, data) {
      return data.name.indexOf(value) != -1;
    },
    shortName(name) {
      if (!name) {
        return "";
      }
      return OrgService.shorterName(name, "");
    },
    loadNode(node, resolve) {
      let deptId;
      if (node.level == 0) {
        this.save_node = node;
        this.save_resolve = resolve;
        if (this.root.top && this.root.top.id) {
          resolve([
            {
              id: this.root.top.id,
              name: this.root.top.name,
              shortName: this.root.top.name,
              dept: {
                id: this.root.top.id,
                name: this.root.top.name,
              },
              org: {
                id: this.root.top.id,
                name: this.root.top.name,
              },
              root: {
                id: this.root.id,
                name: this.root.name,
              },
              parentId: this.root.id,
              disabled: !this.doesSelectLevel1,
              level: 0,
            },
          ]);
        } else {
          resolve([]);
        }
      } else if (node.level <= this.unfoldLevel && node.level > 0) {
        deptId = node && node.data && node.data.id;
        OrgManageService.callCommon("commonListChildrenDept", {
          rootId: this.root.id,
          deptId: deptId,
        })
          .then((d) => {
            let data = [];
            if (d.data.length > 0) {
              d.data = d.data.filter((el) => el.dept.id);
              d.data.forEach((el) => {
                el.name = el.dept.name;
                el.shortName = this.shortName(el.name);
                el.id = el.dept.id;
                el.org = {};
                el.org.id = el.dept.id;
                el.org.name = el.dept.name;
                el.extendsOrg = false;
                el.parentId = deptId;
                el.level = node.level;
                el.allUserCount = el.dept.allUserCount;
                el.userCount = el.dept.userCount;
              });
              if (this.filterRoot == this.root.id && this.filterOrg && this.filterOrg.length && node.level == 1) {
                data = d.data.filter((item) => {
                  return this.filterOrg.indexOf(item.id) != -1;
                });
              } else {
                data = data.concat(d.data || []);
              }
            }
            if (this.sortble) {
              data.sort((item1, item2) => {
                return item1.name.localeCompare(item2.name, "zh-CN");
              });
            }
            resolve(data);
          })
          .catch(() => {
            if (this.$mock) {
              let data = [],
                d = {
                  data: [
                    { dept: { id: "010", name: "境内汇总虚拟机构", allUserCount: 5000, userCount: 1000 }, root: { id: "111", name: "机构员工机构树" } },
                    { dept: { id: "020", name: "业务中心", allUserCount: 5000, userCount: 1000 }, root: { id: "111", name: "机构员工机构树" } },
                    { dept: { id: "030", name: "成都分中心", allUserCount: 17000, userCount: 1000 }, root: { id: "111", name: "机构员工机构树" } },
                  ],
                };
              // for(let i=0;i<300;i++){
              // 	d.data.push(
              // 		{dept:{id:"010"+i,name:'机构'+i},root:{id:'111',name:"机构员工机构树"}}
              // 	)
              // }
              if (d.data.length > 0) {
                d.data = d.data.filter((el) => el.dept.id);
                d.data.forEach((el) => {
                  el.name = el.dept.name;
                  el.shortName = this.shortName(el.name);
                  el.id = el.dept.id;
                  el.org = {};
                  el.org.id = el.dept.id;
                  el.org.name = el.dept.name;
                  el.extendsOrg = false;
                  el.parentId = deptId;
                  el.level = node.level;
                  el.allUserCount = el.dept.allUserCount;
                  el.userCount = el.dept.userCount;
                });
                if (this.filterRoot == this.root.id && this.filterOrg && this.filterOrg.length && node.level == 1) {
                  data = d.data.filter((item) => {
                    return this.filterOrg.indexOf(item.id) != -1;
                  });
                } else {
                  data = data.concat(d.data || []);
                }
              }
              if (this.sortble) {
                data.sort((item1, item2) => {
                  return item1.name.localeCompare(item2.name, "zh-CN");
                });
              }
              resolve(data);
            } else {
              resolve([]);
            }
          });
      } else {
        resolve([]);
      }
    },
    treeNodeClick(d) {
      this.orgSelected((this.lastSelected = d));
      this.$emit("change", this.getSelected());
    },
    getSelected() {
      if (!this.multiple) {
        return [this.lastSelected];
      }
      return this.$refs.tree.getCheckedNodes();
    },
    nodeChanged() {
      //start事件用于通知父组件选中状态开始了，便于父组件开始loading动画
      this.$emit("start");
      if (this.orgTimer) {
        clearTimeout(this.orgTimer);
      }
      //防抖处理
      this.orgTimer = setTimeout(() => {
        this.$emit("change", this.getSelected());
      }, 500);
    },
    setCheckedKeys(d) {
      this.$refs.tree.setCheckedKeys(d);
    },
    getHalfCheckedNodes() {
      return this.$refs.tree.getHalfCheckedNodes();
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes();
    },
    setCheckedNodes(list) {
      return this.$refs.tree.setCheckedNodes(list);
    },
    setChecked(list) {
      return this.$refs.tree.setCheckedKeys(list);
    },
  },
  components: {},
  watch: {
    root: {
      //root改变，重新加载对应机构树
      handler() {
        this.save_node.childNodes = [];
        this.loadNode(this.save_node, this.save_resolve);
      },
      deep: true,
    },
    filterText(cur) {
      this.$refs.tree.filter(cur);
    },
  },
};
</script>

<style lang="scss">
.org-tree-component > div.tree {
  overflow-y: auto;
}

.org-tree-component > .scroll-class::-webkit-scrollbar {
  background: #ffffff;
  width: 4px;
  height: 4px;
}

.org-tree-component > .scroll-class::-webkit-scrollbar-thumb {
  background: #efefef;
  width: 4px;
  border-radius: 2px;
}
.org-tree-component {
  .el-input {
    .el-input__inner {
      height: 30px;
      line-height: 30px;
      border-color: #ddd;
    }
  }
}
</style>
