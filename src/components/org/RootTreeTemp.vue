<template>
  <div class="root-tree">
    <div class="title">机构来源</div>
    <div class="tree scroll-class" v-bind:style="{ 'max-height': maxHeight }">
      <el-tree :props="{ label: 'name', isLeaf: 'leaf' }" :load="loadNode" node-key="id" lazy ref="root" @node-click="treeNodeClick">
        <span class="custom-tree-node" slot-scope="{ data }">
          <img src="@/assets/images/root-icon.png" style="vertical-align: middle; margin-right: 8px" />
          <span>{{ data.name }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { OrgManageService } from "@/http/modules/OrgManageService";
export default {
  name: "root-tree",
  props: {
    maxHeight: {
      type: String,
      default: "400px",
    },
    rootSelected: {
      type: Function,
      default: () => {
        console.log(123);
      },
    },
    selectedRoot: {
      type: Object,
      default: () => ({}),
    },
    allSource: {
      type: Boolean,
      default: false,
    },
    defaultRootId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      lastSelected: undefined,
      listRoot: [],
      onClose: () => {
        console.log(123);
      },
      saveNode: null,
      saveResolve: null,
    };
  },
  methods: {
    filterNode(value, data, node) {
      if (!value) return true;
      if (node.level > 1) {
        return true;
      }
    },
    loadNode(node, resolve) {
      this.saveNode = node;
      this.saveResolve = resolve;
      OrgManageService.callCommon("commonListRoot", {})
        .then((d) => {
          const flag = d.result;
          if (flag === "SUCCESS") {
            d.data.forEach((el) => {
              el.leaf = true; //机构树来源列表无子节点，设置为叶子节点
            });
            if (this.allSource === true) {
              //展示所有机构来源
              this.listRoot = [].concat(d.data);
            } else if (this.allSource === false && !this.defaultRootId) {
              //只展示机构员工
              this.listRoot = [].concat([d.data[0]]);
            } else if (this.allSource === false && this.defaultRootId) {
              this.listRoot = [].concat(d.data.filter((el) => el.id === this.defaultRootId));
            }
            resolve(this.listRoot);
            if (this.defaultRootId && this.listRoot.filter((el) => el.id == this.defaultRootId).length) {
              this.lastSelected = this.listRoot.filter((el) => el.id == this.defaultRootId)[0];
              this.$refs.root.getNode(this.defaultRootId).isCurrent = true;
            } else {
              this.lastSelected = this.listRoot[0];
              this.$refs.root.getNode(this.listRoot[0].id).isCurrent = true;
            }
            this.$emit("changeOnce", this.getSelected());
          } else {
            resolve([]);
          }
        })
        .catch(() => {
          if (this.$mock) {
            let d = {
              result: "SUCCESS",
              data: [
                { id: "111", name: "机构员工机构树", top: { id: "1", name: "中国建设银行股份有限公司" } },
                { id: "222", name: "人力资源机构树", top: { id: "2", name: "中国建设银行(集团)" } },
                { id: "333", name: "财务机构树", top: { id: "3", name: "建信金融" } },
              ],
            };
            const flag = d.result;
            if (flag === "SUCCESS") {
              d.data.forEach((el) => {
                el.leaf = true; //机构树来源列表无子节点，设置为叶子节点
              });
              if (this.allSource === true) {
                //展示所有机构来源
                this.listRoot = [].concat(d.data);
              } else if (this.allSource === false && !this.defaultRootId) {
                //只展示机构
                this.listRoot = [].concat([d.data[0]]);
              } else if (this.allSource === false && this.defaultRootId) {
                //只展示机构员工
                this.listRoot = [].concat(d.data.filter((el) => el.id === this.defaultRootId));
              }
              this.listRoot = [].concat(d.data);
              resolve(this.listRoot);
              if (this.defaultRootId && this.listRoot.filter((el) => el.id == this.defaultRootId).length) {
                this.lastSelected = this.listRoot.filter((el) => el.id == this.defaultRootId)[0];
                this.$refs.root.getNode(this.defaultRootId).isCurrent = true;
              } else {
                this.lastSelected = this.listRoot[0];
                this.$refs.root.getNode(this.listRoot[0].id).isCurrent = true;
              }
              this.$emit("changeOnce", this.getSelected());
            } else {
              resolve([]);
            }
          } else {
            resolve([]);
          }
        });
    },
    treeNodeClick(d) {
      this.rootSelected((this.lastSelected = d));
      if (this.lastSelected.id != this.listRoot[0].id) {
        this.$refs.root.getNode(this.listRoot[0].id).isCurrent = false;
      }
      if (this.defaultRootId && this.listRoot.filter((el) => el.id == this.defaultRootId).length && this.lastSelected.id != this.defaultRootId) {
        this.$refs.root.getNode(this.defaultRootId).isCurrent = false;
      }
      this.$emit("change", this.getSelected());
    },
    getSelected() {
      return this.lastSelected;
    },
  },
  components: {},
  watch: {
    allSource: {
      handler() {
        this.saveNode.childNodes = [];
        this.loadNode(this.saveNode, this.saveResolve);
      },
    },
  },
};
</script>

<style lang="scss">
.root-tree {
  .title {
    padding: 9px 24px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #222222;
  }

  .scroll-class::-webkit-scrollbar {
    background: #ffffff;
    width: 4px;
    height: 4px;
  }

  .scroll-class::-webkit-scrollbar-thumb {
    background: #efefef;
    width: 4px;
    border-radius: 2px;
  }
}
.root-tree > div.tree {
  overflow-y: auto;
}
</style>
