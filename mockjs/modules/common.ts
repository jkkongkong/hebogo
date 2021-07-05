/*
 * @Author: your name
 * @Date: 2021-05-25 17:38:47
 * @LastEditTime: 2021-05-27 18:43:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\mockjs\modules\common.ts
 */
// const Mock = require("mockjs");
import { getSubTagList, getTagDetailById } from "./labelManage";
import { staticsResource, viewResource, searchResource, batchUpdateResource } from "./contentResourceManage";
import Mock from "mockjs";
// const Random = Mock.Random;
const funcs = { getSubTagList, getTagDetailById, staticsResource, viewResource, searchResource, batchUpdateResource };
Mock.mock("/api/common", "post", (option) => {
  const jsonData = JSON.parse(JSON.parse(option.body).jsonData);
  return {
    messgae: "成功",
    result: "SUCCESS",
    data: funcs[jsonData.func](jsonData.data),
  };
});

Mock.mock(RegExp("/api/getUserInfo" + ".*"), "get", (option) => {
  const re = {
    code: "",
    data: {
      currentPosition: {
        orgId: "010102926",
        organization: {
          hierarchyCode: "0",
          id: "010102926",
          localCurrencyCode: "156",
          lv1ParentId: "111111111",
          lv1ParentName: "中国建设银行股份有限公司",
          lv2ParentId: "",
          lv2ParentName: "",
          lv3ParentId: "",
          lv3ParentName: "",
          name: "中国建设银行成都开发中心开发二处",
          preferLanguageCode: "zh",
          regionId: "ZH",
          subBranchId: "",
          subBranchName: "",
          tenancyId: "CN000",
          tenancyName: "建行总行",
          timeZoneCode: "29",
          typeId: "501000000",
        },
        position: { id: "G99999999999", name: "通用岗位" },
        positionId: "G99999999999",
        roles: [
          {
            applicationId: "",
            authorityId: "005a0001",
            authorityName: "维护产品创意",
            id: "J005a00001",
            lv3ActivityId: "n01.001.020.010",
            name: "创意提出人",
          },
          {
            applicationId: "",
            authorityId: "005a0025",
            authorityName: "创客库信息展示",
            id: "J005a00001",
            lv3ActivityId: "n01.001.020.010",
            name: "创意提出人",
          },
          {
            applicationId: "",
            authorityId: "005a0026",
            authorityName: "创客关系图谱展示",
            id: "J005a00001",
            lv3ActivityId: "n01.001.020.010",
            name: "创意提出人",
          },
          {
            applicationId: "",
            authorityId: "005a0035",
            authorityName: "发起创意",
            id: "J005a00001",
            lv3ActivityId: "n01.001.020.010",
            name: "创意提出人",
          },
          {
            applicationId: "",
            authorityId: "005a0036",
            authorityName: "创客个人中心",
            id: "J005a00001",
            lv3ActivityId: "n01.001.020.010",
            name: "创意提出人",
          },
          {
            applicationId: "",
            authorityId: "048A0019",
            authorityName: "配合审计项目",
            id: "J048A00060",
            lv3ActivityId: "n32.005.010.040",
            name: "被审计单位人员",
          },
          {
            applicationId: "",
            authorityId: "048A0020",
            authorityName: "配合审计取证",
            id: "J048A00060",
            lv3ActivityId: "n32.005.010.040",
            name: "被审计单位人员",
          },
          {
            applicationId: "",
            authorityId: "048A0021",
            authorityName: "确认审计发现",
            id: "J048A00060",
            lv3ActivityId: "n32.005.010.040",
            name: "被审计单位人员",
          },
          {
            applicationId: "",
            authorityId: "048A0022",
            authorityName: "沟通审计报告",
            id: "J048A00060",
            lv3ActivityId: "n32.005.010.060",
            name: "被审计单位人员",
          },
          {
            applicationId: "",
            authorityId: "048A0023",
            authorityName: "我的迎审报表",
            id: "J048A00060",
            lv3ActivityId: "n32.005.010.100",
            name: "被审计单位人员",
          },
          {
            applicationId: "",
            authorityId: "X08ARP02",
            authorityName: "配合审计事项",
            id: "JX08ARP002",
            lv3ActivityId: "n32.005.010.040",
            name: "手机APP被审计单位人员",
          },
          {
            applicationId: "",
            authorityId: "X08PDR01",
            authorityName: "手机APP众创平台维护产品创意",
            id: "JX08PDR001",
            lv3ActivityId: "x99.999.999.002",
            name: "手机APP众创平台创意提出人",
          },
          {
            applicationId: "",
            authorityId: "X08PDR06",
            authorityName: "手机APP众创平台众创平台",
            id: "JX08PDR001",
            lv3ActivityId: "x99.999.999.002",
            name: "手机APP众创平台创意提出人",
          },
        ],
      },
      email: "wuxi.cd@ccbft.com",
      employeeId: "66992262",
      fromVpn: false,
      ip: "128.160.182.84",
      joinInTime: 1616515200000,
      name: "吴曦",
      namePinYin: "wuxi",
      organization: { id: "010102926", name: "中国建设银行成都开发中心开发二处" },
      phone: "13693482833",
      positions: [
        {
          orgId: "010102926",
          organization: { id: "010102926", name: "中国建设银行成都开发中心开发二处" },
          position: { id: "G99999999999", name: "通用岗位" },
          positionId: "G99999999999",
        },
        {
          orgId: "010102926",
          organization: { id: "010102926", name: "中国建设银行成都开发中心开发二处" },
          position: { id: "GX0500000002", name: "知识查询与咨询岗" },
          positionId: "GX0500000002",
        },
      ],
      tel: "-",
      typeId: "01",
      uassLogin: "wuxi.zh",
    },
    evtTraceId: "102001W031622015993764935",
    message: "操作成功",
    result: "SUCCESS",
  };

  return re;
});
