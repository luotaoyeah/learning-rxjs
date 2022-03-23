import { interval, skip, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('skip', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(
                logSubscribe(),
                skip(3),
                tap((value) => log(`skip(): ${value}`)),
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
