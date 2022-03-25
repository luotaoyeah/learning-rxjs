import { interval, tap, throttleTime } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('throttleTime', () => {
    /**
     * 默认配置: { leading: true, trailing: false }.
     * 1. 接收数据, 吐给下游, 开始计时, 在计时周期内, 所有上游数据都被丢弃.
     * 2. 重复 1.
     *
     * 由于 trailing: false, 计时周期是不连续的.
     */
    it('01', (cb) => {
        interval(2000)
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
     * { leading: false, trailing: true }.
     * 1. 接收数据, 开始计时.
     * 2. 计时结束, 将计时周期内最后一个数据吐给下游, 开始计时.
     * 3. 重复 2.
     *
     * 由于 trailing: true, 数据吐给下游时, 会立即触发一个新的计时周期.
     */
    it('02', (cb) => {
        interval(2000)
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
     * { leading: true, trailing: true }.
     * 1. 接收数据, 吐给下游, 开始计时.
     * 2. 计时结束, 将计时周期内最后一个数据吐给下游, 开始计时.
     * 3. 重复 2.
     *
     * 由于 trailing: true, 数据吐给下游时, 会立即触发一个新的计时周期.
     *
     * 与 { leading: false, trailing: true } 的唯一区别是: 是否吐出第一个上游数据.
     */
    it('03', (cb) => {
        interval(2000)
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
