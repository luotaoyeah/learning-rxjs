import { EMPTY } from 'rxjs';

/**
 * EMPTY: 产生一个直接 complete 的数据流
 */
describe('EMPTY', () => {
    it('01', (cb) => {
        EMPTY.subscribe({
            next: (value) => {
                // 永远不会 next
            },
            complete: () => {
                console.log('COMPLETE');
                cb();
            },
            error: () => {
                // 永远不会 error
            },
        });
    });
});
