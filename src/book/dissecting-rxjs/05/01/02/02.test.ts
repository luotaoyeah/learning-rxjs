import { TestScheduler } from 'rxjs/testing';
import { concat, interval, merge, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/02/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // merge() 默认会订阅所有的 upstream$,
  // 可以使用最后一个参数 concurrent 表示可以同时订阅的 upstream$ 的个数,
  // 超过 concurrent 的 upstream$ 需要等待其他的 upstream$ complete 之后, 才能被订阅
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000).pipe(
        take(3),
        map((i) => `a_${i}`),
      );
      const source02$ = interval(2000).pipe(
        take(2),
        map((i) => `b__${i}`),
      );
      const source03$ = interval(500).pipe(
        take(2),
        map((i) => `c___${i}`),
      );

      const source$ = merge(source01$, source02$, source03$, 2);
      expectObservable(source$).toBe('1s a 999ms (bc) 996ms d 499ms e 499ms (fg|) ', {
        a: 'a_0',
        b: 'b__0',
        c: 'a_1',
        d: 'a_2',
        e: 'c___0',
        f: 'b__1',
        g: 'c___1',
      });
    });
  });

  // 如果 concurrent 为 1, 则 merge() 等价于 concat()
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(take(2));
      const source02$ = timer(500, 1000).pipe(take(2));

      expectObservable(merge(source01$, source02$, 1)).toBe('a 999ms b 499ms a 999ms (b|)', {
        a: 0,
        b: 1,
      });
      expectObservable(concat(source01$, source02$)).toBe('a 999ms b 499ms a 999ms (b|)', {
        a: 0,
        b: 1,
      });
    });
  });
});
