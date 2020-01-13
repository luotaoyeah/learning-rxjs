import { TestScheduler } from 'rxjs/testing';
import { of, range } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/09/03/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // retry() 用来对发生异常的 observable 进行重试, 可以指定重试次数,
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map((i) => {
          if (i === 4) {
            throw new Error();
          }

          return i;
        }),
        retry(2),
        catchError(() => of(8)),
      );

      expectObservable(source$).toBe('(abcabcabcd|)', {
        a: 1,
        b: 2,
        c: 3,
        d: 8,
      });
    });
  });
});
