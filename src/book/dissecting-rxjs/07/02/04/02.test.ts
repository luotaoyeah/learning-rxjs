import { TestScheduler } from 'rxjs/testing';
import { concat, of, timer } from 'rxjs';
import { distinct, distinctUntilChanged, map, mapTo } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/04/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // distinct()             是保证所有数据都不重复,
  // distinctUntilChanged() 是保证本次数据跟上次数据不重复
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

      expectObservable(source$.pipe(distinctUntilChanged())).toBe(
        'a 999ms b 1999ms c 999ms d 1999ms e 999ms f 999ms |',
        {
          a: 0,
          b: 1,
          c: 2,
          d: 0,
          e: 1,
          f: 3,
        },
      );
    });
  });

  // distinctUntilChanged() 默认使用 === 进行比较, 可以通过参数指定如何进行比较,
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of({ k: 0, v: 'A' }, { k: 1, v: 'B' }, { k: 1, v: 'C' }, { k: 2, v: 'D' });

      expectObservable(
        source$.pipe(
          distinct((i) => i.k),
          map((i) => i.v),
        ),
      ).toBe('(abc|)', {
        a: 'A',
        b: 'B',
        c: 'D',
      });

      expectObservable(
        source$.pipe(
          distinctUntilChanged((x, y) => x.k === y.k),
          map((i) => i.v),
        ),
      ).toBe('(abc|)', {
        a: 'A',
        b: 'B',
        c: 'D',
      });
    });
  });
});
