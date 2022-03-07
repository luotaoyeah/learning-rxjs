import { interval, take } from 'rxjs';

/**
 * interval(): 类似于 setInterval(), 按指定的时间间隔, 从 0 开始吐出递增 1 的整数
 */
describe('interval', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(take(5))
            .subscribe({
                next: (value) => {
                    console.log(value);
                },
                complete: () => cb(),
            });
    });
});
