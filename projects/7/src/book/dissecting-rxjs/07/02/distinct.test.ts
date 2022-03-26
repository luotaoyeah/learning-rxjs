import { distinct, of, tap, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('distinct', () => {
    it('01', (cb) => {
        of(0, 1, 1, 2, 0, 0, 1, 3, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                distinct(),
                tap((value) => log(`distinct: ${value}`)),
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
     * 第 1 个参数 keySelector 用来指定要比较的值, 默认比较的是数据本身.
     */
    it('02', (cb) => {
        of(0, 1, 1, 2, 0, 0, 1, 3, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                distinct((value) => value),
                tap((value) => log(`distinct: ${value}`)),
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
     * 第 2 个参数 flushes 用来指定何时清空内部的 Set 集合, 避免数据积压.
     */
    it('03', (cb) => {
        of(0, 1, 1, 2, 0, 0, 1, 3, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                distinct(undefined, timer(1000)),
                tap((value) => log(`distinct: ${value}`)),
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
