import { interval, takeWhile, tap } from 'rxjs';
import { log } from '../../util';

describe('takeWhile', () => {
    /**
     * 一直连续取数据, 直到条件不成立.
     */
    it('01', (cb) => {
        interval(1000)
            .pipe(
                takeWhile((value) => value < 3),
                tap((value) => log('takeWhile:' + value)),
            )
            .subscribe({ complete: () => cb() });
    });

    /**
     * 第二个参数 inclusive 表示: 是否吐出使条件不成立的那个数据.
     */
    it('02', (cb) => {
        interval(1000)
            .pipe(
                takeWhile((value) => value < 3, true),
                tap((value) => log('takeWhile:' + value)),
            )
            .subscribe({ complete: () => cb() });
    });
});
