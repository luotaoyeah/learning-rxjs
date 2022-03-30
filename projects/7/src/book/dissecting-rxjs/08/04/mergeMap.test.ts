import { interval, mergeMap, take, tap } from 'rxjs';
import { log } from '../../util';

describe('mergeMap', () => {
    /**
     * mergeMap = map + mergeAll
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(
                take(2),
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                mergeMap((value) => interval(1000).pipe(take(3))),
                tap((value) => log(`mergeMap: ${value}`)),
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
