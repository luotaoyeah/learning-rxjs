import { interval, tap, throttle, timer } from 'rxjs';
import { log } from '../../util';

describe('throttle', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                throttle((value) => timer(3000)),
                tap((value) => log(`throttle: ${value}`)),
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
