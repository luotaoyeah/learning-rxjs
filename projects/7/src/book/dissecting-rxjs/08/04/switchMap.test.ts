import { interval, switchMap, take, tap } from 'rxjs';
import { log } from '../../util';

describe('switchMap', () => {
    /**
     * switchMap = map + switchAll
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(
                take(2),
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                switchMap((value) => interval(1000).pipe(take(3))),
                tap((value) => log(`switchMap: ${value}`)),
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
