import { interval, of, zip } from 'rxjs';
import { log } from '../../util';

describe('zip', () => {
    /**
     * 同时订阅所有上游, 每次吐给下游一个数组, 数组的每个元素对应每个上游的数据.
     * 有的上游先吐数据, 就需要等其他上游, 直到所有上游都吐出数据, 才能配对成一个完成的数组吐给下游.
     * 当某个上游完结, 并且它的所有数据都配对了, 则 zip 就完结了.
     */
    it('01', (cb) => {
        const source01$ = interval(1000);
        const source02$ = of('A', 'B', 'C');

        zip(source01$, source02$).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });

    /**
     * 如果最后一个参数是一个函数, 表示对即将吐给下游的数据进行处理后再吐给下游,
     * 这样吐给下游的就可以是其他格式的数据, 而不是默认的数组格式.
     */
    it('02', (cb) => {
        const source01$ = interval(1000);
        const source02$ = of('A', 'B', 'C');

        zip(source01$, source02$, (value01, value02) => {
            return `${value01}-${value02}`;
        }).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
