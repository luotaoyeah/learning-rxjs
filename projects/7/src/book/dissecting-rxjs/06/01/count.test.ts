import { concat, count, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('count', () => {
    /**
     * 上游完结时, 吐出上游数据总个数.
     */
    it('01', (cb) => {
        const source$ = concat(timer(1000), timer(1000));

        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(value),
                }),
                count(),
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
