import { last, of } from 'rxjs';
import { log } from '../../util';

describe('last', () => {
    /**
     * last() 跟 first() 相反.
     */
    it('01', (cb) => {
        of(1, 2, 3)
            .pipe(last())
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
            .pipe(last((value) => value < 0))
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
     * 可以指定默认值, 在没有满足条件的数据时使用.
     */
    it('03', (cb) => {
        of(1, 2, 3)
            .pipe(last((value) => value < 0, -1))
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });
});
