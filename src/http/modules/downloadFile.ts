/*
 * @Author: your name
 * @Date: 2021-06-03 10:17:41
 * @LastEditTime: 2021-06-24 16:58:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\contentResourceManage\uploadFile\DownloadFile.ts
 */
import Axios from "axios";

export class DownloadFile {
  static getFileCluster() {
    return Axios({
      method: "post",
      url: "/ecpJson.action",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: {
        _fw_service_id: "wbGetFileClusterInfo",
      },
    }).then((d) => Promise.resolve(d.data));
  }
  static fetchFile(host: any, filePath: any, bizId: any) {
    return Axios({
      withCredentials: false,
      method: "post",
      url: `http://${host}/ecpweb/ecpJson.action`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: {
        _fw_service_id: "fetchFiles",
        jsonData: JSON.stringify({
          filePath: "bigfile",
          bizId: bizId,
        }),
        noWebsa: true,
      },
    }).then((d) => Promise.resolve(d.data));
  }
  static async getFileUrl(p9FileIdx: any) {
    let fileUrl = "";
    // 获取文件存放服务器IP和路径
    const res = await this.getFileCluster();
    if (res.result === "SUCCESS") {
      const filePathData = res.data;
      // 文件由p9转移至p2s
      const tempFile = await this.fetchFile(filePathData.host, filePathData.tempPath, p9FileIdx);
      if (tempFile.length) {
        const path = tempFile[0];
        const name = tempFile[1];
        // 直接下载或者返回下载路径
        fileUrl = `http://${filePathData.host}/ecpweb/getLocalFile.action?relativePath=${path}&fileName=${name}`;
      }
    }
    console.log(fileUrl);
    return fileUrl;
  }
}
