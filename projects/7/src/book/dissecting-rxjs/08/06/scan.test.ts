import { interval, scan, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('scan', () => {
    /**
     * scan 和 reduce 的区别:
     *   reduce 在上游完结时规约一次,
     *   scan   对上游每一个数据都规约
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                scan((acc, value) => acc + value),
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
