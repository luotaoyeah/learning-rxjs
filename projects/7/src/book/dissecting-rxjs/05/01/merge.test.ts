import { map, merge, take, timer } from 'rxjs';
import { log } from '../../util';

describe('merge', () => {
    /**
     * 同时订阅所有上游, 上游每来一个数据就往下游吐一个数据.
     */
    it('01', (cb) => {
        const source01$ = timer(0, 2000).pipe(map((i) => `A_${i}`));
        const source02$ = timer(1000, 2000).pipe(map((i) => `B_${i}`));

        merge(source01$, source02$)
            .pipe()
            .subscribe({
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
    });

    /**
     * 可以用最后一个参数, 指定最多可以同时订阅多少个上游, 默认会同时订阅所有上游.
     */
    it('02', (cb) => {
        const source01$ = timer(0, 2000).pipe(
            take(3),
            map((i) => `A_${i}`),
        );
        const source02$ = timer(1000, 2000).pipe(
            take(3),
            map((i) => `B_${i}`),
        );
        const source03$ = timer(1000, 2000).pipe(
            take(3),
            map((i) => `C_${i}`),
        );

        merge(source01$, source02$, source03$, 2)
            .pipe()
            .subscribe({
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
    });
});
