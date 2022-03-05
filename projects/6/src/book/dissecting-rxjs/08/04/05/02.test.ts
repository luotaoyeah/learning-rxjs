import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { mergeMapTo, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/04/05/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // mergeMapTo() 等价于 mapTo() + mergeAll(),
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(200).pipe(take(2), mergeMapTo(interval(100).pipe(take(4))));

      expectObservable(source$).toBe('300ms a 99ms b 99ms (cd) 96ms (ef) 96ms g 99ms (h|)', {
        a: 0,
        b: 1,
        c: 0,
        d: 2,
        e: 1,
        f: 3,
        g: 2,
        h: 3,
      });
    });
  });
});
