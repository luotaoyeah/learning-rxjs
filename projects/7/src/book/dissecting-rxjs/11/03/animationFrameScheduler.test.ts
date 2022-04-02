import { animationFrameScheduler, asyncScheduler } from 'rxjs';
import { log } from '../../util';

describe('animationFrameScheduler', () => {
    /**
     * 使用 window.requestAnimationFrame() 来实现异步调度.
     * 如果 delay 不为 0, 则 animationFrameScheduler 等于 asyncScheduler.
     */
    it('01', (cb) => {
        asyncScheduler.schedule(() => log('asyncScheduler'), 1000);
        animationFrameScheduler.schedule(() => log('animationFrameScheduler'), 1000);
    });
});
