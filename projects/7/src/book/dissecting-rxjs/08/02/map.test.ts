import { map, of, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('map', () => {
    it('01', (cb) => {
        of(1, 2, 3)
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                map((value, index) => value ** 2),
                tap((value) => log(`map: ${value}`)),
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
