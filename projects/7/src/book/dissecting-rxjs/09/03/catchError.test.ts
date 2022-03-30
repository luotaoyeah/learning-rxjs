import { catchError, interval, map, of, take, tap, throwError } from 'rxjs';
import { log } from '../../util';

describe('catchError', () => {
    const source$ = interval(1000).pipe(
        take(10),
        map((i) => {
            if (i === 4) {
                throw new Error('死');
            }
            return i;
        }),
    );

    /**
     * 第一个参数 e 表示错误对象,
     * 第二个参数 caught$ 表示当前的数据流(从最上游一直到 catchError 为止),
     */
    it('01', (cb) => {
        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),

                // 直接返回 caught$, 表示从头开始重试, 类似于 retry.
                catchError((e, caught$) => caught$),
                take(10),
                tap((value) => log(`----------| ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });

    /**
     * 返回一个新的 Observable, 作为新的上游.
     */
    it('02', (cb) => {
        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                catchError((e, caught$) => {
                    log(`----------| catchError | ${e.message}`);
                    return of(8);
                }),
                tap((value) => log(`----------| ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });

    /**
     * 使用 throw 语句, 重新抛出捕获的错误, 或者抛出一个新的错误.
     */
    it('03', (cb) => {
        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                catchError((e, caught$) => {
                    log(`----------| catchError | ${e.message}`);
                    // throw e;
                    throw new Error('晦气');
                }),
                tap((value) => log(`----------| ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });

    /**
     * 使用 throwError, 抛出一个新的错误.
     */
    it('04', (cb) => {
        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                catchError((e, caught$) => {
                    log(`----------| catchError | ${e.message}`);
                    return throwError(() => new Error('不吉利的'));
                }),
                tap((value) => log(`----------| ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });
});
