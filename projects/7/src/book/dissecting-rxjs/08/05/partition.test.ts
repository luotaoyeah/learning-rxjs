import { interval, map, merge, partition, tap } from 'rxjs';
import { log } from '../../util';

describe('partition', () => {
    /**
     * 将一个 Observable 拆成两个 Observable, 然后放入一个数组.
     * 第一个 Observable 中的数据都满足条件, 第二个 Observable 中的数据都不满足条件.
     */
    it('01', (cb) => {
        const [even$, odd$] = partition(interval(1000), (value) => value % 2 === 0);

        merge(even$.pipe(map((value) => `偶数: ${value}`)), odd$.pipe(map((value) => `奇数: ${value}`)))
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
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
