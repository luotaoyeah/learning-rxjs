import { map, race, take, timer } from 'rxjs';
import { log } from '../../util';

describe('race', () => {
    /**
     * 谁最先吐出第一个数据, 谁就赢了, 输的上游会被立即退订.
     */
    it('01', (cb) => {
        const source01$ = timer(500, 1000).pipe(map((i) => `A_${i}`));
        const source02$ = timer(0, 2000).pipe(map((i) => `B_${i}`));

        race(source01$, source02$)
            .pipe(take(9))
            .subscribe({
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
    });
});
