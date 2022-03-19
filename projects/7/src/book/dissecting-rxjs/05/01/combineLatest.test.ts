import { combineLatest, map, take, timer } from 'rxjs';
import { log } from '../../util';

describe('combineLatest', () => {
    /**
     * 跟 zip() 的区别在于, 只要任何一个上游吐出数据, 就会立即去拿其他上游的最近一个数据, 然后组成一个数组吐给下游.
     * 当然如果某个上游还未吐出任何数据, 则也得等它至少吐出一个数据.
     */
    it('01', (cb) => {
        const source01$ = timer(1000, 2000).pipe(map((i) => `A_${i}`));
        const source02$ = timer(0, 2000).pipe(map((i) => `B_${i}`));

        combineLatest([source01$, source02$])
            .pipe(take(9))
            .subscribe({
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
    });
});
