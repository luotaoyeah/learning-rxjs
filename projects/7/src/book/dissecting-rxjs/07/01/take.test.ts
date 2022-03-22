import { interval, take } from 'rxjs';
import { log } from '../../util';

describe('take', () => {
    /**
     * 最多取前 n 个数据, 如果上游数据的总数 m < n, 则取 m 个.
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(take(3))
            .subscribe({ next: (value) => log(value), complete: () => cb() });
    });
});
