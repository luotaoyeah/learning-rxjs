import { animationFrameScheduler, asapScheduler, asyncScheduler, queueScheduler, range } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('src/book/dissecting-rxjs/11/01/11-01.01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * scheduler 的作用是, 用来控制数据推送的节奏,
   * rxjs 中主要提供了 4 个 scheduler: asap/async/queue/animationFrame
   */
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(range(1, 3)).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, asapScheduler)).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, asyncScheduler)).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, queueScheduler)).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, animationFrameScheduler)).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
