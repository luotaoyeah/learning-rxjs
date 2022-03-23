import { interval, skip, startWith, takeUntil, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('takeUntil', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                startWith('SUBSCRIBE'),
                tap((value) => value === 'SUBSCRIBE' && log(value)),
                skip(1),

                takeUntil(timer(3000)),
                tap((value) => log('takeUntil():' + value)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
            });
    });
});
