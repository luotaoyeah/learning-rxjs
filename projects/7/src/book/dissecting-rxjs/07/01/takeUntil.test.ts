import { interval, takeUntil, tap, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('takeUntil', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                logSubscribe(),
                takeUntil(timer(3000)),
                tap((value) => log('takeUntil:' + value)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
            });
    });
});
