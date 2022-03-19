import { interval, of, zipWith } from 'rxjs';
import { log } from '../../util';

describe('zipWith', () => {
    /**
     * zipWith() 和 zip() 功能一样, zip() 是静态操作符, zipWith() 是实例操作符.
     */
    it('01', (cb) => {
        const source01$ = interval(1000);
        const source02$ = of('A', 'B', 'C');

        source01$.pipe(zipWith(source02$)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
