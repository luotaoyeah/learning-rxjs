import { interval, skipUntil, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('skipUntil', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                skipUntil(timer(3000)),
                tap((value) => log(`skipUntil: ${value}`)),
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
