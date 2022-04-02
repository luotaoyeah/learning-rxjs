import { interval, take } from 'rxjs';
import { log } from '../../util';

describe('interval', () => {
    /**
     * 类似于 setInterval(), 按指定的时间间隔, 从 0 开始吐出递增 1 的整数.
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(take(5))
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => cb(),
            });
    });
});
