import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/04/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // concatMap() 等价于 map() + concatAll(),
  // 先使用 map() 将上游数据映射为一个 higher-order observable,
  // 再使用 concatAll() 将 higher-order observable 砸平
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(
        take(4),
        concatMap((value, i) =>
          interval(500).pipe(
            map((j) => `${i}-${j}`),
            take(3),
          ),
        ),
      );

      expectObservable(source$).toBe(
        '1000ms a 499ms b 499ms c 499ms d 499ms e 499ms f 499ms g 499ms h 499ms i 499ms j 499ms k 499ms (l|)',
        {
          a: '0-0',
          b: '0-1',
          c: '0-2',
          d: '1-0',
          e: '1-1',
          f: '1-2',
          g: '2-0',
          h: '2-1',
          i: '2-2',
          j: '3-0',
          k: '3-1',
          l: '3-2',
        },
      );
    });
  });
});
