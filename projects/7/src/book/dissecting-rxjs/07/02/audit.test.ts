import { audit, interval, tap, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('audit', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                audit((value) => timer(3000)),
                tap((value) => log(`audit: ${value}`)),
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
