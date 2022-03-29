import { of, single, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('single', () => {
    /**
     * 如果上游只有一个数据满足条件, 则吐出该数据.
     * 如果上游有零个或多个数据满足条件, 则抛出错误.
     */
    it('01', (cb) => {
        of(1, 2, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                single((value) => value % 2 === 9),
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
