import { interval, tap, throttleTime } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('throttleTime', () => {
    /**
     * 接收数据, 吐给下游, 开始计时, 在这个计时周期内, 所有上游数据都被丢弃.
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
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

    /**
     * leading: true
     *     在计时开始时, 将计时周期内的第一个上游数据吐给下游.
     *
     * trailing: true
     *     在计时结束时, 将计时周期内的最后一个上游数据吐给下游.
     *
     */
    it('02', (cb) => {
        interval(1000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                throttleTime(3000, undefined, {
                    leading: false,
                    trailing: true,
                }),
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

    /**
     * 接收数据, 吐给下游, 开始计时, 在这个计时周期内, 所有上游数据都被丢弃.
     */
    it('03', (cb) => {
        interval(1000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                throttleTime(3000, undefined, {
                    leading: true,
                    trailing: true,
                }),
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
