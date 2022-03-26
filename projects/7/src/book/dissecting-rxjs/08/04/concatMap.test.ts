import { concatMap, interval, range, take, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('concatMap', () => {
    /**
     * concatMap = map + concatAll
     */
    it('01', (cb) => {
        range(1, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                concatMap((value) => interval(1000).pipe(take(3))),
                tap((value) => log(`concatMap: ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(e.message);
                    cb();
                },
            });
    });
});
