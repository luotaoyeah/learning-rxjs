import { audit, interval, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('audit', () => {
    it('01', (cb) => {
        interval(2000)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                audit((value) => timer(3000)),
                tap((value) => log(`audit: ${value}`)),
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
