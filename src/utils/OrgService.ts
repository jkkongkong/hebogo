/*
 * @Author: your name
 * @Date: 2021-06-22 14:22:58
 * @LastEditTime: 2021-06-22 14:38:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\utils\OrgService.ts
 */
export class OrgService {
  static shorterName(name: string, parentName: string) {
    const typeA = name.match("(.*)（(.*)）$");
    if (typeA) {
      name = typeA[1];
    }
    const prefixs = [parentName, "中国建设银行股份有限公司"];
    if (!name.match("[)|）]")) {
      prefixs.push("中国建设银行");
    }
    for (const prefix of prefixs) {
      const res = name.replace(new RegExp(prefix, "g"), "");
      if (res.length >= 4) {
        name = res;
      } else {
        return name;
      }
    }
    if (name.match("[)|）]") && !name.includes("有限公司")) {
      const index = Math.max(name.indexOf(")"), name.indexOf("）"));
      if (index != name.length - 1) {
        name = name.substring(index + 1, name.length);
      }
    }
    return name;
  }
}
