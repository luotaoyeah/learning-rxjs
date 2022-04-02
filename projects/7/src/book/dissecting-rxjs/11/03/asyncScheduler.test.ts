import { asyncScheduler } from 'rxjs';
import { log } from '../../util';

describe('asyncScheduler', () => {
    /**
     * asyncScheduler 相当于 setTimeout().
     */
    it('01', (cb) => {
        setTimeout(() => {
            log('setTimeout');
        }, 1000);

        asyncScheduler.schedule(() => {
            log('asyncScheduler');
        }, 1000);
    });

    /**
     * 在回调函数中, 可以递归调用 this.schedule(), 实现 interval() 的效果.
     */
    it('02', (cb) => {
        asyncScheduler.schedule(
            function (state) {
                log(state);
                this.schedule(state! + 1, 1000);
            },
            1000,
            0,
        );
    });
});
