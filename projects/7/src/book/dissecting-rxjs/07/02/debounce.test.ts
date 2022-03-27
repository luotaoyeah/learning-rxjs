import { concat, debounce, interval, map, take, tap, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('debounce', () => {
    it('01', (cb) => {
        concat(
            interval(1000).pipe(
                take(3),
                map((i) => `A_${i}`),
            ),
            interval(3000).pipe(
                take(2),
                map((i) => `B_${i}`),
            ),
            interval(1000).pipe(
                take(3),
                map((i) => `C_${i}`),
            ),
        )
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                debounce((value) => timer(2000)),
                tap((value) => log(`debounce: ${value}`)),
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
