import { groupBy, interval, mergeAll, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('groupBy', () => {
    /**
     * 对上游数据分组, 分别放入不同的 GroupedObservable.
     * 第一个参数 key 表示分组的 key.
     */
    it('01', (cb) => {
        const key = (value: number) => (value % 2 === 0 ? '偶数' : '奇数');
        interval(1000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                groupBy(key, { element: (value) => `${key(value)}: ${value}` }),
                mergeAll(),
                tap((value) => log(`groupBy: ${value}`)),
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
