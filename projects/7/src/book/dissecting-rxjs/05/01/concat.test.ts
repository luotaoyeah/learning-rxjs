import { concat, interval, map, take } from 'rxjs';
import { log } from '../../util';

describe('concat', () => {
    /**
     * 将多个数据源首尾连接, 第一个数据源完结之后立即订阅第二个数据源, 依次类推...
     */
    it('01', (cb) => {
        const source01$ = interval(1000).pipe(
            take(3),
            map((i) => `A_${i}`),
        );
        const source02$ = interval(1000).pipe(
            take(3),
            map((i) => `B_${i}`),
        );

        concat(source01$, source02$).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
