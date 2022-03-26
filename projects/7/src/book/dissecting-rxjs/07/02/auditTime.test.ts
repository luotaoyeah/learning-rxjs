import { auditTime, interval, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('auditTime', () => {
    /**
     * auditTime 跟 throttleTime( { leading: true, trailing: false } ) 的区别:
     *   1. auditTime 不支持 leading/trailing 配置
     *   2. throttleTime 是: 接收数据, 吐出数据, 然后计时;
     *      auditTime    是: 接收数据, 开始计时, 计时接收时吐出该周期内最后一个数据.
     *
     * 由于 auditTime 不支持 leading/trailing 配置, 因此吐出数据时不会触发新的计时周期.
     */
    it('01', (cb) => {
        interval(2000)
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${value}`)),
                auditTime(3000),
                tap((value) => log(`auditTime(): ${value}`)),
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
