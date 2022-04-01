import { interval, takeUntil, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('takeUntil', () => {
    /**
     * 一直取数据, 直到 notifier 吐出一个数据.
     */
    it('01', (cb) => {
        interval(2000)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(value),
                }),
                takeUntil(timer(3000)),
                tap((value) => log(`----------| ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
            });
    });
});
