import { interval, tap, throttle, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('throttle', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                throttle((value) => timer(3000)),
                tap((value) => log(`throttle: ${value}`)),
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
