import { interval, repeat, take, tap } from 'rxjs';
import { log } from '../../util';

describe('repeat', () => {
    /**
     * 上游完结之后, 立即再次订阅. 重复 N 次
     */
    it('01', (cb) => {
        const source$ = interval(1000).pipe(take(3));

        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    unsubscribe: () => log('UNSUBSCRIBE'),
                    complete: () => log('COMPLETE'),
                }),
                repeat(2),
            )
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => cb(),
            });
    });

    /**
     * 可以通过参数 delay 设置延迟多少毫秒再去订阅上游.
     */
    it('02', (cb) => {
        const source$ = interval(1000).pipe(take(3));

        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    unsubscribe: () => log('UNSUBSCRIBE'),
                    complete: () => log('COMPLETE'),
                }),
                repeat({ count: 2, delay: 2000 }),
            )
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => cb(),
            });
    });

    /**
     * 参数 delay 可以是一个函数, 返回一个 Observable, 记为 delay$,
     * 当 delay$ 吐出第一个数据时, repeat 就去订阅上游, 并且退订 delay$.
     */
    it('03', (cb) => {
        const source$ = interval(1000).pipe(take(3));

        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    unsubscribe: () => log('UNSUBSCRIBE'),
                    complete: () => log('COMPLETE'),
                }),
                repeat({
                    count: 3,
                    // count 表示上游已经被订阅了几次
                    delay: (count) => {
                        log(`COUNT: ${count}`);
                        return interval(2000).pipe(
                            tap((value) => {
                                log(`DELAY$: ${value}`);
                            }),
                        );
                    },
                }),
            )
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => cb(),
            });
    });
});
