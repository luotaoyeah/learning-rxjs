import { range, tap } from 'rxjs';
import { log } from '../../util';

describe('range', () => {
    /**
     * 产生连续递增 1 的数字序列.
     */
    it('01', (cb) => {
        range(1.1, 3)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(value),
                }),
            )
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
            });
    });

    /**
     * 只传一个参数时, 该参数表示 count, 此时 start 为 0.
     */
    it('02', (cb) => {
        range(3)
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(value),
                }),
            )
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
            });
    });
});
