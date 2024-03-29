import { interval, skip, tap } from 'rxjs';
import { log } from '../../util';

describe('skip', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                skip(3),
                tap((value) => log(`skip: ${value}`)),
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
