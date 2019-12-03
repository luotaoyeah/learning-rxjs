import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { myMap } from './03';
import { of } from 'rxjs';

describe('src/book/dissecting-rxjs/03/03/01/03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(of(1, 2, 3).pipe(myMap((i) => i * i))).toBe('(abc|)', {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });

  it('should catch error', () => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual[0].notification.error.message).toEqual(expected[0].notification.error.message);
    });

    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = of(1, 2, 3).pipe(
        myMap(() => {
          throw new Error('ERROR');
        }),
      );

      expectObservable(source$).toBe('#', undefined, new Error('ERROR'));
    });
  });
});
