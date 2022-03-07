import { take, timer } from 'rxjs';

/**
 * timer(): 类似于 setTimeout()
 */
describe('timer', () => {
    it('01', (cb) => {
        // 1000 毫秒后吐出 0 然后立即 complete
        timer(1000).subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => cb(),
        });
    });

    it('02', (cb) => {
        // 到了指定的时间点时, 吐出 0 然后立即 complete
        const due: Date = new Date(Date.now() + 1000);
        timer(due).subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => cb(),
        });
    });

    // 如果指定了第二个参数, 则它表示时间间隔, 即第一个数据 0 吐出之后, 按该时间间隔依次吐出 1,2,3...,
    // 这时候就类似于 interval() 的效果
    it('03', (cb) => {
        timer(500, 1000)
            .pipe(take(5))
            .subscribe({
                next: (value) => {
                    console.log(value);
                },
                complete: () => cb(),
            });
    });

    it('04', (cb) => {
        // 如果第一个参数跟第二个参数一样, 则此时等价于 interval()
        timer(1000, 1000)
            .pipe(take(5))
            .subscribe({
                next: (value) => {
                    console.log(value);
                },
                complete: () => cb(),
            });
    });
});
