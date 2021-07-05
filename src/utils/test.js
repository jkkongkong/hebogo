/*
 * @Author: your name
 * @Date: 2021-05-31 14:08:31
 * @LastEditTime: 2021-07-02 15:45:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\utils\test.js
 */
let content1 =
  "<img data=1 src='http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png'src1='http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png'/><img data=2  src='http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png' /><img data=3  src='http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png' src='http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png' /><img data=2  src='http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png' /><img data=3  src='http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png11'/>";
// var val = content1.replace(/http:\/\/.*\/ecpweb\/getLocalFile\.action\?relativePath=.*&fileName=/gim, "haha");
var val = content1.replace(/http:\/\/.*?\/ecpweb\/getLocalFile\.action\?relativePath=.*?&fileName=/g, "haha");
console.log(val);

let str = "<p>adsfasdf</p><p>asdf</p><p><span style='font-size: 36px;'>asdf</span></p><p>asd</p><p>fsd</p><p>af</p>";
var val1 = str.replace(/asd/gim, "haha");
console.log(val1);

var str1 = "<BR><BR>http://wasmip.baidu.com.cn/mip/km/archives/km_archives_main/kmArchivesMain.do?method=view&amp;fdId%1059192<BR>测试22222<BR>http://www.baidu.com<BR><BR>www.baidu.com";
var re = /(http:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)/g;
str1 = str1.replace(re, function (a, b, c) {
  return '<a href="http://' + c + '">' + a + "</a>";
});
console.log(str1);

var str2 = "http://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.pnghttp://128.196.121.120:8101/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=icon.png";
// let re1 = str2.match(/(?<=http:\/\/.*?\/upload\/microapp\/contentMag\/).*?(?=png)/g);
let re1 = str2.match(/(?<=\/hr\/content\/&fileName=).*?(?=(.png|.jpg))/g);
console.log(re1);

let str3 = "123";
let re3 = str3 && str3.replace("2", "0");
console.log(re3);

let temp = null,
  temp2 = 2;
let rel = !temp == 1 && temp2 == 2;

if (temp) {
  console.log(123);
}
