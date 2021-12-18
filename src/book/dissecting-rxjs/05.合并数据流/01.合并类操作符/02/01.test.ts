import { TestScheduler } from 'rxjs/testing';
import { concat, merge, of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // merge() 会同时订阅所有的上游, 只要某个上游有数据吐出, 就会把数据吐给下游,
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(
        take(2),
        map((i) => `a_${i}`),
      );
      const source02$ = timer(500, 1000).pipe(
        take(2),
        map((i) => `b__${i}`),
      );

      expectObservable(merge(source01$, source02$)).toBe('a 499ms b 499ms c 499ms (d|)', {
        a: 'a_0',
        b: 'b__0',
        c: 'a_1',
        d: 'b__1',
      });

      expectObservable(concat(source01$, source02$)).toBe('a 999ms b 499ms c 999ms (d|)', {
        a: 'a_0',
        b: 'a_1',
        c: 'b__0',
        d: 'b__1',
      });
    });
  });

  // 如果上游都是同步数据, 则使用 merge() 没有太多意义
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(merge(of(1, 2), of(3, 4))).toBe('(abcd|)', {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
      expectObservable(concat(of(1, 2), of(3, 4))).toBe('(abcd|)', {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
    });
  });
});
