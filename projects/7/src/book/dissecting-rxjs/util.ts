/**
 * 打印日志, 包含当前的时分秒.
 */
function log(message: any): void {
    console.log(`[ ${new Date().toISOString().substring(11, 19)} ] ${message}`);
}

export { log };
