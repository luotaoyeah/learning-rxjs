import { elementAt, of, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('elementAt', () => {
    /**
     * 返回索引位置的数据.
     */
    it('01', (cb) => {
        of(1, 2, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                elementAt(1),
                tap((value) => log(`elementAt: ${value}`)),
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
     * 索引超出范围时, 抛出 ArgumentOutOfRangeError 错误.
     */
    it('02', (cb) => {
        of(1, 2, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                elementAt(4),
                tap((value) => log(`elementAt: ${value}`)),
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
     * 可以指定默认值, 在索引超出范围时使用.
     */
    it('03', (cb) => {
        of(1, 2, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                elementAt(4, 6),
                tap((value) => log(`elementAt: ${value}`)),
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
