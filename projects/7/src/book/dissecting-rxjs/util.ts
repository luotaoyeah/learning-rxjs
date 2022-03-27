import { Observable, OperatorFunction, skip, startWith, tap } from 'rxjs';

/**
 * 打印日志, 包含当前的时分秒.
 */
function log(message: any): void {
    let msg = message;

    if (typeof message === 'object' && message !== null) {
        msg = JSON.stringify(message, null, 0);
    }

    console.log(`         ${new Date().toISOString().substring(11, 19)} ${msg}`);
}

/**
 * 打印订阅上游的时间.
 */
function logSubscribe<T>(): OperatorFunction<T, T> {
    return function (source: Observable<T>) {
        log('SUBSCRIBE');
        return source;
    };
}

export { log, logSubscribe };
