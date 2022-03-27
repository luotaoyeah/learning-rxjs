import { catchError, finalize, interval, map, of, take, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('finalize', () => {
    const source$ = interval(1000).pipe(
        take(10),
        map((i) => {
            if (i === 4) {
                throw new Error('死');
            }
            return i;
        }),
    );

    /**
     * 当上游 complete 或者 error 或者被 unsubscribe 时, finalize 中的回调函数都会执行.
     * 注意: finalize 回调是在 complete 回调或者 error 回调执行之后才会执行.
     */
    it('01', (cb) => {
        source$
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                catchError((e, caught$) => of(8)),
                take(5),
                tap((value) => log(`----------| ${value}`)),
                finalize(() => log(`----------| finalize |`)),
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