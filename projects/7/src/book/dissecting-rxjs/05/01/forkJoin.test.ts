import { forkJoin, map, take, timer } from 'rxjs';
import { log } from '../../util';

describe('forkJoin', () => {
    /**
     * 等所有上游都完结后, 取每个上游的最后一个数据, 合成数组吐给下游.
     */
    it('01', (cb) => {
        const source01$ = timer(0, 1000).pipe(
            map((i) => `A_${i}`),
            take(3),
        );
        const source02$ = timer(1000, 2000).pipe(
            map((i) => `B_${i}`),
            take(2),
        );

        forkJoin([source01$, source02$]).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
