import { NEVER } from 'rxjs';

/**
 * NEVER: 产生一个不吐数据, 且永不完结的数据流
 */
describe('NEVER', () => {
    it('01', (cb) => {
        NEVER.subscribe({
            next: (value) => {
                // 永远不会 next
            },
            complete: () => {
                // 永远不会 complete
            },
            error: () => {
                // 永远不会 error
            },
        });
    });
});
