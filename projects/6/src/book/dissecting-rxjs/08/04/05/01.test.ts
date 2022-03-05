import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { concatMapTo, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/04/05/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // concatMapTo() 等价于 mapTo() + concatAll()
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(200).pipe(take(2), concatMapTo(interval(100).pipe(take(3))));

      expectObservable(source$).toBe('300ms a 99ms b 99ms c 99ms d 99ms e 99ms (f|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 0,
        e: 1,
        f: 2,
      });
    });
  });
});
