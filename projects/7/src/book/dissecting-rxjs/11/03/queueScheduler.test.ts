import { asyncScheduler, queueScheduler } from 'rxjs';
import { log } from '../../util';

describe('queueScheduler', () => {
    /**
     * 如果 delay 不为 0, 则 queueScheduler 等于 asyncScheduler.
     */
    it('01', (cb) => {
        queueScheduler.schedule(() => log('queueScheduler'), 1000);
        asyncScheduler.schedule(() => log('asyncScheduler'), 1000);
    });

    /**
     * 如果 delay 等于 0, 则 queueScheduler 会用同步的方式来调度任务.
     */
    it('02', (cb) => {
        log('BEFORE');

        queueScheduler.schedule(() => log('queueScheduler'), 0);

        log('AFTER');
    });
});
