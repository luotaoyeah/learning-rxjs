import { TestScheduler } from 'rxjs/testing';
import { concat, interval, timer } from 'rxjs';
import { count, filter, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/06/01/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // count() 统计上游数据总数,
  // 上游完结之后, 才会吐出数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(interval(500).pipe(take(3)), timer(0, 1000).pipe(take(3)));
      expectObservable(source$.pipe(count())).toBe('3500ms (a|)', {
        a: 6,
      });
    });
  });

  // 可以只返回满足条件的数据总数
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(interval(500).pipe(take(3)), timer(0, 1000).pipe(take(3)));
      expectObservable(source$.pipe(count((i) => i % 2 === 0))).toBe('3500ms (a|)', {
        a: 4,
      });

      // 等价于 filter() 跟 count() 组合
      expectObservable(
        source$.pipe(
          filter((i) => i % 2 === 0),
          count(),
        ),
      ).toBe('3500ms (a|)', {
        a: 4,
      });
    });
  });
});
