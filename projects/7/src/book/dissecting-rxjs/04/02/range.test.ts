import { range } from 'rxjs';

/**
 * range(): 产生连续递增 1 的数字序列
 */
describe('range', () => {
    it('01', (cb) => {
        range(1.1, 5).subscribe({
            next: (data) => {
                console.log(data);
            },
            complete: () => cb(),
        });
    });
});
