import { interval, Observable, repeat, take, tap } from 'rxjs';
import { log } from '../../util';

/**
 * repeat(): 重复订阅上游 n 次, 上游完结之后就会立即再次订阅
 */
describe('repeat', () => {
    /**
     * 上游完结之后, 立即再次订阅.
     */
    it('01', (cb) => {
        const source$ = new Observable((subscriber) => {
            console.log('SUBSCRIBE');

            setTimeout(() => subscriber.next(1), 1000);
            setTimeout(() => subscriber.next(2), 2000);
            setTimeout(() => subscriber.next(3), 3000);
            setTimeout(() => subscriber.complete(), 4000);

            return {
                unsubscribe() {
                    console.log('UNSUBSCRIBE');
                },
            };
        });

        source$.pipe(repeat(2)).subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => {
                console.log('COMPLETE');
                cb();
            },
        });
    });

    /**
     * 可以通过参数 delay 设置延迟多少毫秒再去订阅上游.
     */
    it('02', (cb) => {
        const source$ = new Observable((subscriber) => {
            console.log('SUBSCRIBE');

            setTimeout(() => subscriber.next(1), 1000);
            setTimeout(() => subscriber.next(2), 2000);
            setTimeout(() => subscriber.next(3), 3000);
            setTimeout(() => subscriber.complete(), 4000);

            return {
                unsubscribe() {
                    console.log('UNSUBSCRIBE');
                },
            };
        });

        source$.pipe(repeat({ count: 2, delay: 2000 })).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => {
                log('COMPLETE');
                cb();
            },
        });
    });

    /**
     * 参数 delay 可以是一个函数, 返回一个 Observable, 记为 delay$,
     * 当 delay$ 吐出第一个数据时, repeat 就去订阅上游, 并且退订 delay$.
     */
    it('03', (cb) => {
        interval(1000)
            .pipe(
                take(3),
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
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
    });
});
