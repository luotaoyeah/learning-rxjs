import { asapScheduler, asyncScheduler, range } from 'rxjs';
import { log } from '../../util';

describe('asapScheduler', () => {
    /**
     * scheduler 用来控制数据产生的节奏.
     */
    it('01', (cb) => {
        const start = Date.now();

        // 默认情况下, 所有数据是同步产生的
        const source$ = range(1, 100000);

        log('BEFORE');

        source$.subscribe({ complete: () => log(`COMPLETE | ${Date.now() - start}ms`) });

        log('AFTER');
    });

    /**
     * asapScheduler 控制数据异步产生, 但是会尽可能使用微任务(Micro Task)来实现.
     */
    it('02', (cb) => {
        const start = Date.now();

        const source$ = range(1, 100000, asapScheduler);

        log('BEFORE');

        source$.subscribe({ complete: () => log(`COMPLETE | ${Date.now() - start}ms`) });

        log('AFTER');
    });

    /**
     * asapScheduler 会尽可能使用微任务, 因此优先级会高于宏任务.
     */
    it('03', (cb) => {
        // setTimeout() 是宏任务, 虽然代码在前, 但是执行在后
        setTimeout(() => log('setTimeout'), 0);
        asyncScheduler.schedule(() => log('asyncScheduler'), 0);
        asapScheduler.schedule(() => log('asapScheduler'), 0);
    });
});
