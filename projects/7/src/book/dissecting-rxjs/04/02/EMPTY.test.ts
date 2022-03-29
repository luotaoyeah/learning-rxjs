import { EMPTY, tap } from 'rxjs';
import { log } from '../../util';

describe('EMPTY', () => {
    /**
     * EMPTY: 产生一个直接 complete 的数据流
     */
    it('01', (cb) => {
        EMPTY.pipe(
            tap(() => {
                // 不会经过管道
                log('tap');
            }),
        ).subscribe({
            next: (value) => {
                // 永远不会 next
                log('NEXT');
                cb();
            },
            complete: () => {
                log('COMPLETE');
                cb();
            },
            error: (e) => {
                // 永远不会 error
                log(`ERROR | ${e.message}`);
                cb();
            },
        });
    });
});
