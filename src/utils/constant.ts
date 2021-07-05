/*
 * @Author: your name
 * @Date: 2021-05-27 09:09:34
 * @LastEditTime: 2021-07-01 17:33:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\utils\constant.ts
 */

// 资源管理......................................................................................
//来源类型
export const sourceTypes = {
  1: "运营创建",
  2: "建行大学",
};
//资源类型
export const resourceTypes = {
  1: "课程",
  2: "微课",
  3: "电子书",
  4: "自建知识",
};
//资源类型
export const resourceTypesReverse = {
  课程: "1",
  微课: "2",
  电子书: "3",
  新闻资讯: "4",
};
//资源状态
export const resourceStatus = {
  0: "初始导入",
  1: "草稿",
  2: "待审核",
  3: "审核失败",
  4: "已发布",
};
//资源业务类型
export const busTypes = {
  1: "1-XXX",
  2: "2-XXX",
};
//富文本编辑器tips
export const toolbarTips = [
  { Choice: ".ql-bold", title: "加粗" },
  { Choice: ".ql-italic", title: "倾斜" },
  { Choice: ".ql-underline", title: "下划线" },
  { Choice: ".ql-header", title: "段落格式" },
  { Choice: ".ql-strike", title: "删除线" },
  { Choice: ".ql-blockquote", title: "块引用" },
  { Choice: ".ql-code-block", title: "插入代码段" },
  { Choice: ".ql-size", title: "字体大小" },
  { Choice: '.ql-list[value="ordered"]', title: "编号列表" },
  { Choice: '.ql-list[value="bullet"]', title: "项目列表" },
  { Choice: '.ql-header[value="1"]', title: "h1" },
  { Choice: '.ql-header[value="2"]', title: "h2" },
  { Choice: ".ql-align", title: "对齐方式" },
  { Choice: ".ql-color", title: "字体颜色" },
  { Choice: ".ql-font", title: "字体" },
  { Choice: ".ql-background", title: "背景颜色" },
  { Choice: ".ql-image", title: "图像" },
  { Choice: ".ql-video", title: "视频" },
  { Choice: ".ql-link", title: "添加链接" },
  { Choice: ".ql-formula", title: "插入公式" },
  { Choice: ".ql-clean", title: "清除格式" },
  { Choice: '.ql-script[value="sub"]', title: "下标" },
  { Choice: '.ql-script[value="super"]', title: "上标" },
  { Choice: '.ql-indent[value="-1"]', title: "向左缩进" },
  { Choice: '.ql-indent[value="+1"]', title: "向右缩进" },
  { Choice: ".ql-direction", title: "文本方向" },
  { Choice: ".ql-appendix", title: "添加附件" },
  { Choice: ".ql-lineheight", title: "行间距" },
  { Choice: ".ql-header .ql-picker-label", title: "标题大小" },
  {
    Choice: '.ql-header .ql-picker-item[data-value="1"]',
    title: "标题一",
  },
  {
    Choice: '.ql-header .ql-picker-item[data-value="2"]',
    title: "标题二",
  },
  {
    Choice: '.ql-header .ql-picker-item[data-value="3"]',
    title: "标题三",
  },
  {
    Choice: '.ql-header .ql-picker-item[data-value="4"]',
    title: "标题四",
  },
  {
    Choice: '.ql-header .ql-picker-item[data-value="5"]',
    title: "标题五",
  },
  {
    Choice: '.ql-header .ql-picker-item[data-value="6"]',
    title: "标题六",
  },
  {
    Choice: ".ql-header .ql-picker-item:last-child",
    title: "标准",
  },
  {
    Choice: '.ql-size .ql-picker-item[data-value="small"]',
    title: "小号",
  },
  {
    Choice: '.ql-size .ql-picker-item[data-value="large"]',
    title: "大号",
  },
  {
    Choice: '.ql-size .ql-picker-item[data-value="huge"]',
    title: "超大号",
  },
  {
    Choice: ".ql-size .ql-picker-item:nth-child(2)",
    title: "标准",
  },
  {
    Choice: ".ql-align .ql-picker-item:first-child",
    title: "居左对齐",
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="center"]',
    title: "居中对齐",
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="right"]',
    title: "居右对齐",
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="justify"]',
    title: "两端对齐",
  },
];

// 内容推送................................................................................
export const ruleStatus = {
  0: "停用",
  1: "启用",
  2: "待停用",
  3: "待启用",
};
