import { TestScheduler } from 'rxjs/testing';
import { of, range } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/09/03/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // finalize() 会在上游 complete() 或者 error() 时执行
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map((i) => {
          if (i === 4) {
            throw new Error();
          }

          return i;
        }),
      );

      expectObservable(
        source$.pipe(
          catchError(() => of(8)),
          finalize(() => {
            console.log('FINALLY');
          }),
        ),
      ).toBe('(abcd|)', {
        a: 1,
        b: 2,
        c: 3,
        d: 8,
      });

      expectObservable(
        source$.pipe(
          finalize(() => {
            console.log('FINALLY');
          }),
        ),
      ).toBe(
        '(abc#)',
        {
          a: 1,
          b: 2,
          c: 3,
        },
        new Error(),
      );
    });
  });
});
