import { TestScheduler } from 'rxjs/testing';
import { EMPTY, interval, throwError, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/04/04.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // takeUntil() 接受一个 observable 参数, 记为 notifier$,
  // 当 notifier$ 吐出第一个数据时, takeUntil() 就会完结
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(take(3), takeUntil(timer(2500)))).toBe('1s a 999ms b 499ms |', {
        a: 0,
        b: 1,
      });

      // 如果 notifier$ 没有吐出数据直接完结, takeUntil() 就会吐出所有上游数据
      expectObservable(interval(1000).pipe(take(3), takeUntil(EMPTY))).toBe('1s a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });

  // 如果 notifier$ 抛出错误, 则 takeUntil() 会把错误吐给下游
  it('should throw', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(takeUntil(throwError('ERR')))).toBe('#', undefined, 'ERR');
    });
  });
});
