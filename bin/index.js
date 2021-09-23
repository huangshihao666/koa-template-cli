#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import execa from 'execa'; // 执行命令库（是对nodejs的child_process的封装）
import chalk from 'chalk';
import createIndexTemplate from './createIndexTemplate.js'; // 生成index.js文件模板
import createPackageTemplate from './createPackageTemplate.js'; // 生成package.json文件模板
import answer from './question/index.js'; // 用户命令行交互问题
import createConfig from './config.js'; // 处理用户输入 --> 生成配置文件

const userConfig = await answer();
const inputConfig = createConfig(userConfig);

// 1、创建文件夹 ---> koa-template-cli   使用nodejs的fs\
fs.mkdirSync(getRemotePath());
console.log(chalk.blue('创建 koa-template-cli 目录完成'));

// 2、创建入口文件 ---> index.js  使用nodejs的fs
fs.writeFileSync(`${getRemotePath()}/index.js`, createIndexTemplate(inputConfig));
console.log(chalk.blue('创建 index.js 完成'));

// 3、创建package.json文件
fs.writeFileSync(`${getRemotePath()}/package.json`, createPackageTemplate(inputConfig));
console.log(chalk.blue('创建 package.json 文件完成'));

// 4、安装依赖
console.log(chalk.blue('安装依赖...'));
console.log(getRemotePath());
try {
  await execa("npm install", {
    cwd: getRemotePath(),
    stdio: [2, 2, 2],
  });
} catch (error) {
  console.log(error);
}
// 执行yarn会报错  暂时使用npm执行
// execa("yarn", {
//     cwd: getRemotePath(),
//     stdio: [2, 2, 2],
//   });

console.log(chalk.green("tip:"));
console.log(chalk.green("cd app && npm run serve"));

// 获取根路径
function getRemotePath() {
    // return `./${userConfig.packageName}`
    return path.resolve(process.cwd(), userConfig.packageName)
}
