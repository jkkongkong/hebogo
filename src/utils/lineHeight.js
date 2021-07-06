/*
 * @Author: your name
 * @Date: 2021-06-15 19:13:29
 * @LastEditTime: 2021-06-24 19:05:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\utils\lineHeight.ts
 */
import Quill from "quill";
const Parchment = Quill.import("parchment");
class lineHeightAttributor extends Parchment.Attributor.Style {}
const lineHeightStyle = new lineHeightAttributor("lineHeight", "line-height", { scope: Parchment.Scope.INLINE, whitelist: ["1", "1.5", "1.75", "2", "3", "4", "5"] });

export { lineHeightStyle };
