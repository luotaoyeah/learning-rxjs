import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/04/03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // takeWhile() 取上游数据直到条件不满足
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(takeWhile((i) => i < 3))).toBe('1s a 999ms b 999ms c 999ms |', {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });

  // 可以配置是否吐出不满足条件的那个数据
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(takeWhile((i) => i < 3, true))).toBe('1s a 999ms b 999ms c 999ms (d|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      });
    });
  });
});
