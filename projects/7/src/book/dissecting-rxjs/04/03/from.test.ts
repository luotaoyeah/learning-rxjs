import { from } from 'rxjs';

/**
 * 只要类型满足 ObservableInput 的数据, 都可以被 from() 转换为 Observable.
 */
describe('from', () => {
    /**
     * 数组, 每个数组元素成为一个数据.
     */
    it('01', (cb) => {
        from([1, 2, 3]).subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => cb(),
        });
    });

    /**
     * 类数组的对象.
     */
    it('02', (cb) => {
        from({ 0: 1, 1: 2, 2: 3, length: 3 }).subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => cb(),
        });
    });

    /**
     * generater.
     */
    it('03', (cb) => {
        from(
            (function* () {
                yield 1;
                yield 2;
                yield 3;
            })(),
        ).subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => cb(),
        });
    });

    /**
     * 字符串.
     */
    it('04', (cb) => {
        from('123').subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => cb(),
        });
    });

    /**
     * Promise.
     */
    it('05', (cb) => {
        from(new Promise((resolve) => resolve(1))).subscribe({
            next: (value) => {
                console.log(value);
            },
            complete: () => cb(),
        });
    });
});
