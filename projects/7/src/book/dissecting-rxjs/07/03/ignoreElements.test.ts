import { ignoreElements, interval, of, tap, throttle, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('ignoreElements', () => {
    /**
     * 忽略所有上游数据, 只关心 complete 和 error.
     */
    it('01', (cb) => {
        of(1, 2, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                ignoreElements(),
                tap((value) => log(`ignoreElements: ${value}`)),
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
