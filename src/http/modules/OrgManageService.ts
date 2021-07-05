/*
 * @Author: your name
 * @Date: 2021-06-22 14:21:37
 * @LastEditTime: 2021-06-29 14:40:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\http\modules\OrgManageService.ts
 */
import Axios from "axios";
import qs from "qs";
export class OrgManageService {
  //wbCallCommon => ��ΪwbCallUdfOrgTree
  static callCommon(funcCode: string, data: any, serviceId = "wbCallUdfOrgTree") {
    return Axios({
      method: "post",
      url: "/ecpJson.action",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: qs.stringify({
        _fw_service_id: serviceId,
        jsonData: JSON.stringify({
          func: funcCode,
          data: data,
        }),
      }),
    }).then((d) => Promise.resolve(d.data));
  }

  static AreaGradeCall(type: any, offset: any, limit: any = 10, title: any) {
    return Axios({
      method: "post",
      url: "/ecpJson.action",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: {
        _fw_service_id: "wbCallCommon",
        jsonData: JSON.stringify({
          func: "listStdCodePaginated",
          data: { categoryId: type, offset: offset, limit: limit, title: title },
        }),
      },
    }).then((d) => Promise.resolve(d.data));
  }
}
