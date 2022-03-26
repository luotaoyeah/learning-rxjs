import { exhaustMap, interval, take, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('exhaustMap', () => {
    /**
     * exhaustMap = map + exhaustAll
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(
                take(2),
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                exhaustMap((value) => interval(1000).pipe(take(3))),
                tap((value) => log(`exhaustMap: ${value}`)),
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
