import { concatWith, interval, map, take } from 'rxjs';
import { log } from '../../util';

describe('concatWith', () => {
    /**
     * concatWith() 和 concat() 功能一样, concat() 是静态操作符, concatWith() 是实例操作符.
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

        source01$.pipe(concatWith(source02$)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
