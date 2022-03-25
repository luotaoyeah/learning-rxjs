import { interval, sample, tap, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('sample', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                sample(interval(3000)),
                tap((value) => log(`sample(): ${value}`)),
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
