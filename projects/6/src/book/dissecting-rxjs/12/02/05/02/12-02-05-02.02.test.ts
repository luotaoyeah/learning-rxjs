import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';

describe('src/book/dissecting-rxjs/12/02/05/02/12-02-05-02.02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * 除了可以直接对 observable marble string 进行测试之外,
   * 还可以对订阅和取消订阅的 subscription marble string 进行测试,
   * subscription marble string 和 observable marble string 有一些区别,
   * 在 subscription marble string 中, 只有三种字符: -, ^, !
   * 分别表示: 时间的帧, 订阅时刻, 取消订阅时刻
   */

  it('should work with hot()', () => {
    scheduler.run(({ hot, expectObservable }: RunHelpers) => {
      /*
       * hot observable marble string 的时间帧是从 0 开始的
       */
      const observable01 = hot('                -a-a-a-a-a-a-a-a-a-a-'); // 1, 3, 5, 7, 9, ...
      const subscriptionMarbleString: string = '---^---!-'; // [3, 7)

      expectObservable(observable01, subscriptionMarbleString).toBe('---a-a-'); // 3, 5
    });
  });

  it('should work with cold()', () => {
    scheduler.run(({ cold, expectObservable }: RunHelpers) => {
      /*
       * cold observable marble string 的时间帧是从 1 开始的
       */
      const observable02 = cold('                -a-a-a-a-a-a-a-a-a-a-'); // 2, 4, 6, 8, 10, ...
      const subscriptionMarbleString: string = '---^---!-'; // [3, 7)

      expectObservable(observable02, subscriptionMarbleString).toBe('----a-a-'); // 4, 6
    });
  });

  it('should work for expectSubscriptions()', () => {
    scheduler.run(({ cold, hot, expectSubscriptions }: RunHelpers) => {
      const observable01: ColdObservable<void> = cold('----|');
      observable01.subscribe();
      expectSubscriptions(observable01.subscriptions).toBe('^---!');

      const observable02: HotObservable<void> = hot('----|');
      observable02.subscribe();
      expectSubscriptions(observable02.subscriptions).toBe('^---!');
    });
  });
});
