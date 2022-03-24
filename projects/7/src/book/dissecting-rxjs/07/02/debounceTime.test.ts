import { concat, debounceTime, interval, map, take, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('debounceTime', () => {
    /**
     * 接收数据, 开始计时,
     * 在这个计时周期内, 如果又有上游数据, 则重新开始;
     * 在这个计时周期内, 如果没有上游数据, 则计时结束时, 吐出数据;
     */
    it('01', (cb) => {
        concat(
            interval(1000).pipe(
                take(3),
                map((i) => `A_${i}`),
            ),
            interval(3000).pipe(
                take(2),
                map((i) => `B_${i}`),
            ),
            interval(1000).pipe(
                take(3),
                map((i) => `C_${i}`),
            ),
        )
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                debounceTime(2000),
                tap((value) => log(`debounceTime(): ${value}`)),
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
