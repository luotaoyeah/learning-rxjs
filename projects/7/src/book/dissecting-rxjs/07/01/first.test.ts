import { first, of } from 'rxjs';
import { log } from '../../util';

describe('first', () => {
    /**
     * 可以不传断言参数, 直接吐出上游的第一个数据.
     */
    it('01', (cb) => {
        of(1, 2, 3)
            .pipe(first())
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });

    /**
     * 如果没有满足条件的数据, 则抛出一个错误.
     */
    it('02', (cb) => {
        of(1, 2, 3)
            .pipe(first((value, index, source) => value < 0))
            .subscribe({
                next: (value) => log(value),
                error: (err) => {
                    log(err.message);
                    cb();
                },
                complete: () => cb(),
            });
    });

    /**
     * 可以指定默认值, 在没有满足条件的数据时使用默认值.
     */
    it('03', (cb) => {
        of(1, 2, 3)
            .pipe(first((value) => value < 0, -1))
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });
});
