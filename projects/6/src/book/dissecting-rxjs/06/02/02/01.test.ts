import { TestScheduler } from 'rxjs/testing';
import { interval, zip } from 'rxjs';
import { find, findIndex, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/06/02/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // find() 和 findIndex() 查找并返回第一个满足条件的数据/索引
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(map((i) => i + 1));

      expectObservable(source$.pipe(find((i) => i % 2 === 0))).toBe('2s (a|)', {
        a: 2,
      });

      expectObservable(source$.pipe(findIndex((i) => i % 3 === 0))).toBe('3s (a|)', {
        a: 2,
      });
    });
  });

  // 同时返回数据和索引
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(map((i) => i + 1));

      const predicate = (i: number) => i % 2 === 0;

      const find$ = source$.pipe(find(predicate));
      const findIndex$ = source$.pipe(findIndex(predicate));

      expectObservable(zip(find$, findIndex$)).toBe('2s (a|)', {
        a: [2, 1],
      });
    });
  });

  // 如果找不到满足条件的数据, find() 返回 undefined
  // 如果找不到满足条件的数据, findIndex() 返回 -1
  it('should work 03', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(take(3));

      expectObservable(source$.pipe(find((i) => i === 9))).toBe('3s (a|)', { a: undefined });
      expectObservable(source$.pipe(findIndex((i) => i === 9))).toBe('3s (a|)', { a: -1 });
    });
  });
});
