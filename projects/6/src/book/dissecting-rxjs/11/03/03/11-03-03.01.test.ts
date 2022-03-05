import { asapScheduler, asyncScheduler, queueScheduler } from 'rxjs';

describe('src/book/dissecting-rxjs/11/03/03/11-03-03.01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should work', () => {
    console.log('BEFORE');

    /*
     * asapScheduler 使用 microtask 队列来实现异步
     */
    asapScheduler.schedule(() => {
      console.log('asap');
    });

    /*
     * asyncScheduler 等价于使用 setTimeout() 来实现异步
     */
    asyncScheduler.schedule(() => {
      console.log('async');
    });

    /*
     * 对于 queueScheduler,
     *   如果 delay 等于 0, 则使用同步的方式,
     *   如果 delay 大于 0, 则跟 asyncScheduler 一样
     */
    queueScheduler.schedule(() => {
      console.log('queue');
    });

    console.log('AFTER');

    jest.advanceTimersByTime(1000);
  });
});
