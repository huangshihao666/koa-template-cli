import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

export default (config) => {
    // 读取文件，返回的是Buffer,需使用toString()转成字符串
    const __dirname = fileURLToPath(import.meta.url);
    const createIndexTemplate = fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'));
    // ejs引擎渲染，输出html string; render(string, data)  ===> data为传入参数，在ejs文件里可以获取到使用
    const code = ejs.render(createIndexTemplate.toString(), {
        middleware: config.middleware
    })
    return prettier.format(code, { parser: "babel" })
}
