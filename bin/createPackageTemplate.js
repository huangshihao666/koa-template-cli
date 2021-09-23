import ejs from 'ejs'; // ejs模板 用变量控制模板内容
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // 获取当前目录
import prettier from 'prettier'; // 代码格式化

export default (config) => {
    // 读取文件，返回的是Buffer,需使用toString()转成字符串
    const __dirname = fileURLToPath(import.meta.url); // 当前目录路径
    const createIndexTemplate = fs.readFileSync(path.resolve(__dirname, '../template/package.ejs')); // 拼接绝对路径
    // ejs引擎渲染，输出html string; render(string, data)  ===> data为传入参数，在ejs文件里可以获取到使用
    const code = ejs.render(createIndexTemplate.toString(), {
        config
    })
    return prettier.format(code, { parser: "json" })
}
