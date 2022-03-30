import { interval, takeUntil, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('takeUntil', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
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
