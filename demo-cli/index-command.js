#!/usr/bin/env node
const clone = require("git-clone");
const program = require("commander");
const shell = require("shelljs");
const ora = require("ora");
const path = require("path");
const chalk = require("chalk");
const logSymbols = require("log-symbols");

program
  .version("1.0.0")
  .description("demo-cli命令行工具")
  .usage("<command> [项目名称]")
  .usage("example: demo-cli -t example-react-antd")
  .command("* <tpl> <dist>")
  .action(function(tpl, dist) {
    console.log(chalk.blue("目前demo-cli支持以下模板：example-react-antd"));
    console.log(chalk.blue("使用例子：demo-cli example-react-antd myproject"));
    if (tpl && dist) {
      let pwd = shell.pwd();
      const url = `https://github.com/qingfengmy/${tpl}.git`;
      const target = `${pwd}/${dist}`;
      const spinner = ora(`正在下载项目模板，地址：${url}`);
      spinner.start();
      clone(url, target, null, function(e) {
        if (e) {
          // 报错
          spinner.fail();
          console.error(logSymbols.error, chalk.red(`创建失败`));
        } else {
          // 成功
          spinner.succeed();
          // 删除.git
          const pwd = shell.pwd();
          shell.rm("-rf", pwd + `/${dist}/.git`);
          console.log(logSymbols.success, chalk.green("创建成功"));
        }
      });
    } else {
      console.log.error(
        "正确命令例子：demo-cmd-cli examle-react-antd myproject"
      );
    }
  })
  .parse(process.argv);
