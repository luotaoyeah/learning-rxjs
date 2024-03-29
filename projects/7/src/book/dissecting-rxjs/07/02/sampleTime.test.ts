import { interval, sampleTime, tap } from 'rxjs';
import { log } from '../../util';

describe('sampleTime', () => {
    /**
     * 订阅后, 立即开启不间断的均匀的计时周期, 在每个周期结束时, 吐出该周期内最后一个上游数据(如果有).
     */
    it('01', (cb) => {
        interval(2000)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                sampleTime(3000),
                tap((value) => log(`sampleTime: ${value}`)),
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
