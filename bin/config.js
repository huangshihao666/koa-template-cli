export default function createConfig(answer) {
    function haveMiddleware(name) {
        return answer.middleware.indexOf(name) !== -1;
    }
    return {
        packageName: answer.packageName,
        port: answer.port,
        middleware: {
            static: haveMiddleware('koaStatic'),
            router: haveMiddleware('koaRouter')
        }
    }
};
