import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

describe('src/doc/api/delay/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // delay() 将整个数据流延迟, 之后每个数据按照原来的节奏吐出
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(of(1, 2, 3)).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(of(1, 2, 3).pipe(delay(1000))).toBe('1000ms (abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });

  // 如果要对每个数据分别进行延迟, 可以结合 concatMap() 一起实现
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(of(1, 2, 3).pipe(concatMap((i) => of(i).pipe(delay(1000))))).toBe(
        '1000ms a 999ms b 999ms (c|)',
        {
          a: 1,
          b: 2,
          c: 3,
        },
      );
    });
  });
});
