import { TestScheduler } from 'rxjs/testing';
import { concat, interval, of, timer } from 'rxjs';
import { distinct, map, mapTo } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // distinct() 对上游相同的数据只取一次
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(
        of(0),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(2)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(3)),
        timer(1000).pipe(mapTo(3)),
      );

      expectObservable(source$.pipe(distinct())).toBe('a 999ms b 1999ms c 3999ms d 999ms |', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      });
    });
  });

  // distinct() 默认使用 === 比较, 也可以通过参数指定如何进行比较
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of({ k: 0, v: 'A' }, { k: 1, v: 'B' }, { k: 1, v: 'C' }, { k: 2, v: 'D' });

      expectObservable(
        source$.pipe<{ k: number; v: string }, string>(
          distinct<{ k: number; v: string }, number>((i) => i.k),
          map<{ k: number; v: string }, string>((i) => i.v),
        ),
      ).toBe('(abc|)', {
        a: 'A',
        b: 'B',
        c: 'D',
      });
    });
  });

  // distinct() 会在内部维护一个数据集合, 用来记录唯一数据,
  // 我们可以通过参数 flushes$ 对数据集合进行重置, 每当 flushes$ 吐出数据时, 数据集合就会重置
  it('should work 03', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(
        of(0),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(2)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(3)),
        timer(1000).pipe(mapTo(3)),
      );

      expectObservable(source$.pipe(distinct())).toBe('a 999ms b 1999ms c 3999ms d 999ms |', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      });

      const flushes$ = interval(2000);
      expectObservable(source$.pipe(distinct(undefined, flushes$))).toBe(
        'a 999ms b 999ms c 999ms d 999ms e 1999ms g 999ms h 999ms (i|)',
        {
          a: 0,
          b: 1,
          c: 1,
          d: 2,
          e: 0,
          g: 1,
          h: 3,
          i: 3,
        },
      );
    });
  });
});
