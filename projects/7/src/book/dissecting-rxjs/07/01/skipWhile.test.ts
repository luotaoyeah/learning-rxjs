import { interval, skipWhile, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('skipWhile', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(
                logSubscribe(),
                skipWhile((value) => value < 3),
                tap((value) => log(`skipWhile: ${value}`)),
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
