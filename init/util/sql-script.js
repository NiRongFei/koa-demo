const fs = require("fs");

/**
 * 封装所有sql文件脚本内容
 * @return {object}
 */
function getSqlScript() {
  let sqlScripts = {};
  const sqlFiles = getSqlFile();
  for (let key in sqlFiles) {
    sqlScripts[key] = fs.readFileSync(sqlFiles[key], "binary");
  }
  return sqlScripts;
}

function getSqlFile() {
  let basePath = __dirname.replace(/\\/g, "/");
  let pathArr = basePath.split("/");
  pathArr.splice(-1, 1, "/sql/");
  // pathArr = pathArr.slice(0, pathArr.length - 1);
  basePath = pathArr.join("/");

  return getFiles(basePath, "sql");
}

function getFiles(path, mime) {
  let fileList = {};
  const files = fs.readdirSync(path);
  for (let [index, item] of files.entries()) {
    const itemArr = item.split(".");
    const itemMime =
      itemArr.length > 1 ? itemArr[itemArr.length - 1] : "undefined";
    // let keyName = item + "";
    if (mime === itemMime) {
      fileList[item] = path + item;
    }
  }
  return fileList;
}

module.exports = getSqlScript;
