
export default () => {
    return {
        type: 'input',
        name: 'packageName',
        message: 'set your package name',
        // default: 'my-koa-app', // 默认项目名称
        validate(val) {
            if (val) return true;
            return '请输入项目名称'; // 错误的话  直接返回错误提示即可
        }
    }
};

