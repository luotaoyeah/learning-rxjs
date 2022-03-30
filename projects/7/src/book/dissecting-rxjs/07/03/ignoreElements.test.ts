import { ignoreElements, of, tap } from 'rxjs';
import { log } from '../../util';

describe('ignoreElements', () => {
    /**
     * 忽略所有上游数据, 只关心 complete 和 error.
     */
    it('01', (cb) => {
        of(1, 2, 3)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                ignoreElements(),
                tap((value) => log(`ignoreElements: ${value}`)),
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
