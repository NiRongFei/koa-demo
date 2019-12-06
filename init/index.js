const fs = require("fs");
const { query } = require("./util/db");
const getSqlScript = require("./util/sql-script");

// 打印脚本执行日志
const eventLog = function(err, sqlFile, index) {
  if (err) {
    console.log(
      `[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`
    );
  } else {
    console.log(
      `[SUCCESS] sql脚本文件: ${sqlFile} 第${index +
        1}条脚本 执行成功 O(∩_∩)O !`
    );
  }
};

// 执行建表sql脚本
const createAllTables = async () => {
  const sqlScripts = getSqlScript();
  for (let key in sqlScripts) {
    let sqlShell = sqlScripts[key];
    let sqlShellList = sqlShell.split(";");

    for (let [i, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        let result = await query(shell);
        if (result.serverStatus * 1 === 2) {
          eventLog(null, key, i);
        } else {
          eventLog(true, key, i);
        }
      }
    }
  }
  console.log("sql脚本执行结束！");
  console.log("请按 ctrl + c 键退出！");
};

createAllTables();
