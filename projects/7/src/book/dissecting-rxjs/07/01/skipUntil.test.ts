import { interval, skipUntil, tap, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('skipUntil', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(
                logSubscribe(),
                skipUntil(timer(3000)),
                tap((value) => log(`skipUntil: ${value}`)),
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
