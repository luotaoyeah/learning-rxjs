import { concat, count, skip, startWith, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('count', () => {
    it('01', (cb) => {
        const source$ = concat(timer(1000), timer(1000));

        source$
            .pipe(
                startWith('SUBSCRIBE'),
                tap((value) => value === 'SUBSCRIBE' && log(value)),
                skip(1),

                count(),
                tap((value) => log('count:' + value)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
            });
    });
});
