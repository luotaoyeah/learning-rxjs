import { TestScheduler } from 'rxjs/testing';
import { EmptyError, interval } from 'rxjs';
import { last, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // last() 和 first() 相反, 查找最后一个满足条件的数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          take(5),
          last(),
        ),
      ).toBe('5s (a|)', { a: 5 });

      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          take(5),
          last((i) => i % 2 === 0),
        ),
      ).toBe('5s (a|)', { a: 4 });

      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          take(5),
          last((i) => i === 9),
        ),
      ).toBe('5s #', undefined, new EmptyError());

      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          take(5),
          last((i) => i === 9, 9),
        ),
      ).toBe('5s (a|)', { a: 9 });
    });
  });
});
