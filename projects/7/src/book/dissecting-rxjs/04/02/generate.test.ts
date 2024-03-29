import { generate, Observable } from 'rxjs';

/**
 * generate(): 类似 for 循环
 */
describe('generate', () => {
    it('01', (cb) => {
        /**
         * 使用 generate() 模拟实现 range().
         */
        function rangeX(start: number, count: number): Observable<number> {
            return generate<number, number>({
                initialState: start,
                condition: (state) => state < start + count,
                iterate: (state) => state + 1,
                resultSelector: (state) => state,
            });
        }

        rangeX(1.1, 5).subscribe({
            next: (data) => {
                console.log(data);
            },
            complete: () => cb(),
        });
    });
});
