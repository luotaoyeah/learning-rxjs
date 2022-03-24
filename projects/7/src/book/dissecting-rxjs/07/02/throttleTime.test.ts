import { interval, tap, throttleTime } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('throttleTime', () => {
    /**
     * 接收数据, 吐给下游, 开始计时, 在这个计时周期内, 所有上游数据都被丢弃.
     */
    it('01', (cb) => {
        interval(2000)
            .pipe(
                logSubscribe(),
                throttleTime(3000),
                tap((value) => log(`throttleTime(): ${value}`)),
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
