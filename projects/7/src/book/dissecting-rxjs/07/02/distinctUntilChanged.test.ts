import { distinctUntilChanged, of, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('distinctUntilChanged', () => {
    /**
     * 默认使用 === 比较相等性.
     */
    it('01', (cb) => {
        of(0, 1, 1, 2, 0, 0, 1, 3, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                distinctUntilChanged(),
                tap((value) => log(`distinctUntilChanged: ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(e.message);
                    cb();
                },
            });
    });

    /**
     * 第 1 个参数 comparator 用来指定比较方式, 即如何判断两个数据是否相等.
     */
    it('02', (cb) => {
        of(0, 1, 1, 2, 0, 0, 1, 3, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                distinctUntilChanged((x, y) => x === y),
                tap((value) => log(`distinctUntilChanged: ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(e.message);
                    cb();
                },
            });
    });
});
