import { mergeWith, interval, map, take, timer } from 'rxjs';
import { log } from '../../util';

describe('mergeWith', () => {
    /**
     * mergeWith() 和 merge() 功能一样, merge() 是静态操作符, mergeWith() 是实例操作符.
     */
    it('01', (cb) => {
        const source01$ = timer(0, 2000).pipe(
            take(3),
            map((i) => `A_${i}`),
        );
        const source02$ = timer(1000, 2000).pipe(
            take(3),
            map((i) => `B_${i}`),
        );

        source01$.pipe(mergeWith(source02$)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
