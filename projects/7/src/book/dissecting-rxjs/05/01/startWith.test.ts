import { map, startWith, take, timer } from 'rxjs';
import { log } from '../../util';

describe('startWith', () => {
    /**
     * 在订阅上游之前, 先同步吐出若干个数据.
     */
    it('01', (cb) => {
        const source01$ = timer(2000, 1000).pipe(map((i) => `A_${i}`));

        source01$.pipe(startWith(1, 2, 3), take(9)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
