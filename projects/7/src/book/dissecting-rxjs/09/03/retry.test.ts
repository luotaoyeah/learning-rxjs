import { catchError, interval, map, of, retry, take, tap, timer } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('retry', () => {
    const source$ = interval(1000).pipe(
        take(10),
        map((i) => {
            if (i === 4) {
                throw new Error('死');
            }
            return i;
        }),
    );

    it('01', (cb) => {
        source$
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                retry(2),
                catchError((e, caught$) => of(8)),
                take(20),
                tap((value) => log(`----------| ${value}`)),
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

    /**
     * 参数 RetryConfig.delay 表示延迟多久再重试, 而不是立即重试.
     */
    it('02', (cb) => {
        source$
            .pipe(
                logSubscribe(),
                tap((value) => log(`--| ${value}`)),
                retry({
                    count: 1,
                    delay: () => timer(1000),
                }),
                catchError((e, caught$) => of(8)),
                take(20),
                tap((value) => log(`----------| ${value}`)),
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
