import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { concatAll, mergeAll, take, windowTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // windowTime() 创建多个时间块, 在每个时间块的开始时刻, 会吐给下游一个 span$,
  // 在每个时间块中, 每当上游吐数据时, 就会通过 span$ 将数据吐给下游,
  // 时间块结束时, span$ 就会完结,
  // span$ 是一个 hot observable,
  // windowTime() 的第一个参数, 表示时间块的持续时间
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(10), windowTime(2000));

      expectObservable(source$.pipe(mergeAll())).toBe('500ms a 499ms b 499ms c 499ms d 499ms e 499ms f 499ms g 499ms h 499ms i 499ms (j|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7,
        i: 8,
        j: 9,
      });

      expectObservable(source$.pipe(concatAll())).toBe('500ms a 499ms b 499ms c 499ms d 499ms e 499ms f 499ms g 499ms h 499ms i 499ms (j|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7,
        i: 8,
        j: 9,
      });
    });
  });

  // windowTime() 的第二个参数, 表示创建时间块的间隔, 默认跟第一个参数一样 (即间隔时间跟持续时间一样, 因此时间块是一个紧接着一个的)
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(10));

      expectObservable(source$.pipe(windowTime(2000, 1000), mergeAll())).toBe(
        '500ms a 499ms (bb) 496ms (cc) 496ms (dd) 496ms (ee) 496ms (ff) 496ms (gg) 496ms (hh) 496ms (ii) 496ms (jj|)',
        {
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          e: 4,
          f: 5,
          g: 6,
          h: 7,
          i: 8,
          j: 9,
        },
      );
      expectObservable(source$.pipe(windowTime(2000, 1000), concatAll())).toBe(
        '500ms a 499ms b 499ms c 499ms d 499ms e 499ms f 499ms g 499ms h 499ms i 499ms (j|)',
        {
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          e: 4,
          f: 5,
          g: 6,
          h: 7,
          i: 8,
          j: 9,
        },
      );
    });
  });

  // windowTime() 的第三个参数, 用来设置每个 span$ 最多能吐多少个数据,
  // 只要吐出的数据达到个数, span$ 就会立即完结
  it('should work 03', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(10));

      expectObservable(source$.pipe(windowTime(2000, 1000, 1), mergeAll())).toBe('500ms a 499ms b 999ms d 999ms f 999ms h 999ms (j|)', {
        a: 0,
        b: 1,
        d: 3,
        f: 5,
        h: 7,
        j: 9,
      });
    });
  });
});
